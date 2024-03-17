# Private Order Book

## Description of the project

I created a darkpool, which is a private orderbook, using FHE.
This means that all the orders in the orderbook have encrypted prices and quantities.

## Background

Darkpools provide the following advantages over public orderbooks:
- increased market efficiency and liquidity
- MEV resistance
- market manipulation resistance

With the recent introduction of Touring complete fully homomorphic encryption that is also computationally feasible
we are finally able to provide mathematical guarantees to the privacy of darkpools.

## Design and Architecture

### Public order book implementation

Traditionally order books are implemented as linked lists (representing sorted price levels) of linked lists (representing orders sorted by timestamp), with the additional mapping of prices to the corresponding nodes that allow for O(1) amortized time complexity of accessing orders at a given price level and removal and addition of orders at new price levels.

### Challenges of darkpool implementations

However, the above approach is not feasible when implementing an onchain darkpool using FHE for a number of reasons that I discovered over the course of the hackathon:
- linked lists can't be used
  - first of all, length of the linked list is dynamic and cannot be made private
  - second of all, the time complexity advantages don't apply when using FHE because we need to go over all of the elements anyway to obfuscate any modifications
  - third of all, implementing a private linked list is not really possible. Solidity linked list implementations use mappings to map to neighbouring elements, however, using FHE, the same number encrypted twice leads to different cipher texts, so it can't be used as a key of a mapping. If we wanted to decrypt the cipher text to use it for the mapping then it effectively becomes public because any memory changes outside of view functions (even local ones) can be observed publicly. Moreover using decrypt in a non-view function is unstable as in the future it might lead to networking issues as decrypt will require a different verification network
- because of obfuscation we can't really have better time complexity than O(n), where n is the number of orders
- because of order modification obfuscations and computational overhead we need to limit the number of orders in the orderbook
  - we already established that the length of a dynamic data structure cannot really be made private unless it's abstracted away inside of a fixed length data structure
- computational overhead of FHE
    - current gas limit on Fhenix - 50 million
    - a single FHE operation might take around 100k gas
    - a single FHE encrypted variable might contain around 50kB worth of data (which limits networking and cross-chain interactions)
- conditional logic is very hard/impossible to be done in a privacy-preserving way
  - that means that e.g. we can't really execute the orders when we see that they cross. This should be done in a separate step and we need to be very thoughtful about this execution.

### Implementations considered/implemented throughout the hackathon

#### Public order book implementation

First of all, I familiarised myself with the way that public order books are efficiently implemented.
My plan was to adapt it to use FHE: https://github.com/KramPiotr/private-orderbook/commit/bff999be532ca68a81d8b0fa96ce144e3cda98f1

However, upon realising the above challenges and trying out half-baked solutions with public prices but private quantities, I decided to abandon this code and approach all together.

#### Fixed number of distinct price levels and fixed number of orders per price level

My first implementation was an order book with a fixed number of distinct price levels and fixed number of orders per price level. This implementation can be found when exploring the repo at the following commit:
https://github.com/KramPiotr/private-orderbook/commit/1ec1c7e6df14446eb52936c9aac6214c48599683

The idea behind it was that the least competitive price levels would be removed as more competitive price levels arise

This solution seemed quite efficient from the computational perspective (seemingly O(d + n / d) time complexity where d is the depth of the price level), however it contained a few major flaws:
- with fixed number of orders per price level, all the additional orders at this price level don't end up in the book, which might result in a pathological situation in which a less competitive order gets filled instead of the more competitive one just because there were more orders at the more competitive price level
  - this could partially be solved by allowing different price levels to contain the same prices but then this approach doesn't contain any obvious benefits over an approach with just one big array of sorted by competitiveness orders
- the perceived time complexity advantage doesn't really apply to a fully private solution as you need to modify all orders at each new state modification in order to achieve full obfuscation

#### Sorted by competitiveness fixed-length list of orders

This is the final approach at which I arrived.

This has the following advantage:
- by keeping the array sorted and performing an encrypted bubble sort every time we see an order, we can guarantee O(n) time complexity for order insertion, done in a fully private way

The challenge I stumbled across with this approach:
- when filling opposite side orders, if you want to avoid the situation in which empty (fully filled) orders are left in your fixed length array, you need to implement the operation of shifting an array by k elements. There is a way to do that in O(n) time complexity, however, this would require decrypting an encrypted variable outside of a view function, which we established earlier leaks information and is unstable (in the future decrypt could be subject to network issues etc.). That's why I decided to follow the O(n^2) approach in which I shift by 1 element k times but iterate over the array n - 1 times in order to obfuscate k.

### Future direction

It would be very interesting to research into how sacrificing some privacy constraints but limiting computational overhead could lead to achieving a 'sweet spot', at which the FHE darkpool could actually become usable by industry.

Some possible approaches I would like to research:
- randomizing modifications
  - instead of modifying all the orders at every operation maybe we could modify a couple of randomly chosen as well as the ones that we actually want to modify?


Another area of research is to make this solution as efficient as possible.
A couple of ideas I can think of:
- merging orders together into bit maps
- look into building more sophisticated data structures to store the orders e.g. trees
- implementing encrypted mappings

We know that FHE is Touring complete at this point so it's just a matter of finding the way :)

## Practical tips

Steps to run locally:

- `pnpm install`
- `pnpm run localfhenix:start`

To test the contract after modifying OrderBook.sol:
- `pnpm localfhenix:stop && pnpm localfhenix:start && pnpm hardhat run scripts/DeployLocal.ts && pnpm hardhat run scripts/MintToken.ts && pnpm hardhat run scripts/PlaceOrder.ts`
- on testnet it's enough to do `pnpm hardhat run scripts/TestnetScript.ts` currently




"use client";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Token, tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "./ui/command";

export const TokenSelector = ({
  selectedToken,
  onSelectToken,
}: {
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const filteredTokens = tokens.filter(
    (token) =>
      token.address !== "NATIVE"
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={selectedToken ? "outline" : "default"}
          size={"sm"}
          className={`w-[180px] rounded-full font-semibold flex justify-between px-2`}
        >
          {selectedToken ? (
            <>
              <Avatar className="w-6 h-6">
                <AvatarImage src={selectedToken.image} />
                <AvatarFallback>{selectedToken.symbol}</AvatarFallback>
              </Avatar>
              {selectedToken.symbol}
            </>
          ) : (
            <span className="ml-1">Select token</span>
          )}
          <ChevronDownIcon size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandInput placeholder="Search by token name or address"></CommandInput>
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup heading="Suggested">
              {filteredTokens.map((token, i) => (
                <CommandItem
                  onSelect={() => {
                    onSelectToken(token);
                    setOpen(false);
                  }}
                  key={i}
                >
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src={token.image} />
                    <AvatarFallback>{token.symbol}</AvatarFallback>
                  </Avatar>
                  {token.symbol}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedToken === token ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

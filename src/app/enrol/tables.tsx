import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon } from "@radix-ui/react-icons";
import { AccordionHeader } from "@radix-ui/react-accordion";

const BothTable = () => {
  return (
    <Table className="mt-4">
      <TableBody className="">
        <TableRow className="">
          <TableCell className="font-medium">OPENING BALANCE</TableCell>
          <TableCell>1,000,000</TableCell>
          <TableCell>400,000</TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">BUY Discount</TableCell>
          <TableCell>30%</TableCell>
          <TableCell>10%</TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">White list</TableCell>
          <TableCell>ALL</TableCell>
          <TableCell>LIMITED</TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">STAKE POINTS</TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">VOTE (ALL PROPOSALS)</TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">Artist Commissions</TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">Artist Commissions</TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
        </TableRow>
        <TableRow className="leading-8">
          <TableCell className="font-medium">Lower Mint Fees %5</TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
          <TableCell>
            <CheckIcon />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const Tier1Table = () => {
  return (
    <Accordion type="single" className="w-full md:hidden" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left justify-start py-1 text-gray-400 fill-gray-400">
          TIER 1 BENEFITS
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <Table>
            <TableBody className="">
              <TableRow className="">
                <TableCell className="font-medium">OPENING BALANCE</TableCell>
                <TableCell>1,000,000</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">BUY Discount</TableCell>
                <TableCell>30%</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">White list</TableCell>
                <TableCell>ALL</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">STAKE POINTS</TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  VOTE (ALL PROPOSALS)
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Artist Commissions
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Artist Commissions
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Lower Mint Fees %5
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Tier2Table = () => {
  return (
    <Accordion type="single" className="w-full md:hidden" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left justify-start py-1 text-gray-400 fill-gray-400">
          TIER 2 BENEFITS
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <Table>
            <TableBody className="">
              <TableRow className="">
                <TableCell className="font-medium">OPENING BALANCE</TableCell>
                <TableCell>1,000,000</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">BUY Discount</TableCell>
                <TableCell>30%</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">White list</TableCell>
                <TableCell>ALL</TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">STAKE POINTS</TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  VOTE (ALL PROPOSALS)
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Artist Commissions
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Artist Commissions
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
              <TableRow className="leading-8">
                <TableCell className="font-medium">
                  Lower Mint Fees %5
                </TableCell>
                <TableCell>
                  <CheckIcon />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { BothTable, Tier1Table, Tier2Table };

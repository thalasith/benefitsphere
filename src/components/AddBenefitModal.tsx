import { useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { CustomSelect } from "./CustomSelect";

interface AddBenefitModal {
  refresh?: () => void;
}

const benefits = ["Retirement", "Risk", "Health"];

export const AddBenefitModal: React.FC<AddBenefitModal> = () => {
  const { data: sessionData } = useSession();

  const activeClient = sessionData?.user.activeClient ?? 0;

  const { data: clientCountries } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: activeClient,
    });

  const countries =
    clientCountries?.map((country) => country.country ?? "") ?? [];

  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [benefitName, setBenefitName] = useState("");
  const [country, setCountry] = useState("");

  const addRiskPlan = api.riskPlan.create.useMutation();

  const handleAddBenefit = () => {
    if (!benefitName || benefitName === "") {
      return;
    }

    if (selectedBenefit === "Risk") {
      console.log("Adding Risk Plan");
      addRiskPlan.mutate({
        clientId: activeClient,
        planName: benefitName,
        country: country,
      });
      Router.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-primary-lt hover:text-white"
        >
          Add Benefit
        </Button>
      </DialogTrigger>
      <DialogContent className="text-primary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Benefit</DialogTitle>
          <DialogDescription>
            Add a new benefit here. Please fill in the required fields.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Benefit Name
            </Label>
            <Input
              type="text"
              id="benefitName"
              name="benefitName"
              className=" col-span-3 rounded border border-primary px-2 py-1"
              onChange={(e) => setBenefitName(e.target.value)}
              value={benefitName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Country
            </Label>
            <CustomSelect
              placeholder="Select Benefit"
              options={countries}
              value={country}
              setValue={setCountry}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Benefit Type
            </Label>
            <CustomSelect
              placeholder="Select Benefit"
              options={benefits}
              value={selectedBenefit}
              setValue={setSelectedBenefit}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="rounded bg-primary px-3 py-2 text-white hover:bg-primary-lt"
            onClick={() => handleAddBenefit()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

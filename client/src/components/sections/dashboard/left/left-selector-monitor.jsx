import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { stateConfig } from "@/Configuration/config";
import capitaliseCase from "@/utils/string/capitalCase";

function LeftSelectorMonitor() {
  return (
    <>
      {Object.keys(stateConfig.initSelectedOptions).map((key) => (
        <div key={key} className="dropdown-selection">
          <Label htmlFor="dropdown-selection__option">
            {capitaliseCase(key)}
          </Label>
          <div className="dropdown-selection__select-box">
            <Select className="dropdown-selection__option">
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value"></SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </>
  );
}

export default LeftSelectorMonitor;

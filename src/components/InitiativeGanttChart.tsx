import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { TimeUnit } from "./types";
import { GanttChartBase } from "./GanttChartBase";
import { GanttButton } from "./GanttButton";
import { GanttModal } from "./GanttModal";

export function InitiativeGanttChart() {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("week");
  const [showCreateGroupModal, setShowCreateGroupModal] =
    useState<boolean>(false);

  const handleTimeHeaderChange = (event: SelectChangeEvent) => {
    const timeUnit = event.target.value as TimeUnit;
    setTimeUnit(timeUnit);
  };

  return (
    <>
      <FormControl style={{ margin: "20px" }}>
        <InputLabel id={"timeUnitSelector"}>Time Unit</InputLabel>
        <Select
          labelId={"timeUnitSelector"}
          id={"timeUnitSelector"}
          value={timeUnit}
          onChange={handleTimeHeaderChange}
        >
          <MenuItem value={"week"}>Week</MenuItem>
          <MenuItem value={"month"}>Month</MenuItem>
          <MenuItem value={"quarter"}>Quarter</MenuItem>
        </Select>
      </FormControl>
      <GanttChartBase {...{ timeUnit }} />
      <GanttModal
        handleClose={() => setShowCreateGroupModal(false)}
        show={showCreateGroupModal}
        title={"Create Epic"}
      >
        <div>{"Testing"}</div>
      </GanttModal>
      <GanttButton
        onClick={() => setShowCreateGroupModal(true)}
        text={"+ Add Epic"}
      />
    </>
  );
}

import React, { useState } from 'react';
import {Accordion,AccordionSummary,AccordionDetails,Checkbox,FormControlLabel,Typography,Box} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MinimizeIcon from '@mui/icons-material/Minimize';

const data = [
  {department: 'customer_service',sub_departments: ['support', 'customer_success']},
  {department: 'design',sub_departments: ['graphic_design', 'product_design', 'web_design']}
];

const DepartmentList: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  
    const handleExpand = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
    };
  
    const handleSelectDepartment = (department: string) => {
      const allSelected = selected[department] || false;
      const newSelected = { ...selected, [department]: !allSelected };
      data.forEach(dept => {
        if (dept.department === department) {
          dept.sub_departments.forEach(subDept=>newSelected[subDept] = !allSelected);
        }
      });
      setSelected(newSelected);
    };
  
    const handleSelectSubDepartment = (department: string, subDept: string) => {
      const newSelected = { ...selected, [subDept]: !selected[subDept] };
      const allSelected = data
        .find(dept => dept.department === department)!
        .sub_departments.every(subDept => newSelected[subDept]);
      newSelected[department] = allSelected;
      setSelected(newSelected);
    };
  
    return (
      <Box sx={{
        width: '90%', // Responsive width
        maxWidth: 600, // Maximum width
        margin: 'auto',
        mt: 5, // Adjusted top margin
        '@media (min-width:600px)': {
          width: '40%', // Adjusted width for larger screens
        },
      }}>
        <Typography variant="h5" component="h2">Departments</Typography>
        {data.map(({ department, sub_departments }) => (
          <Accordion key={department} expanded={expanded === department} onChange={handleExpand(department)}>
            <AccordionSummary id={`${department}-header`} aria-controls={`${department}-content`} sx={{ alignItems: 'center' }}>
              {expanded === department && <MinimizeIcon />}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected[department] || false}
                    onChange={() => handleSelectDepartment(department)}
                    onClick={event => event.stopPropagation()}
                  />
                }
                label={
                  <Typography>
                    {department.charAt(0).toUpperCase() + department.slice(1).replace(/_/g, ' ')}
                    {` (${sub_departments.length})`} {/* Display count here */}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', marginTop: '-2vw', marginLeft: '2.6vw' }}>
              {sub_departments.map(subDept => (
                <FormControlLabel
                  key={subDept}
                  control={
                    <Checkbox
                      checked={selected[subDept] || false}
                      onChange={() => handleSelectSubDepartment(department, subDept)}
                    />
                  }
                  label={subDept.charAt(0).toUpperCase() + subDept.slice(1).replace(/_/g, ' ')}
                  sx={{ pl: 4 }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

export default DepartmentList;
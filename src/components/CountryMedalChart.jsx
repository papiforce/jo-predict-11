/* eslint-disable react/prop-types */
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

const CountryMedalChart = ({ predictions }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [medalData, setMedalData] = useState([]);

  return (
    <Container sx={{ margin: "4rem auto 256px" }}>
      <Autocomplete
        options={predictions.map((country) => country.country_name)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Select Country" variant="outlined" />
        )}
        value={selectedCountry}
        onChange={(event, newValue) => {
          setSelectedCountry(newValue);

          if (newValue) {
            const countryMedals = predictions.find(
              (country) => country.country_name === newValue
            );

            setMedalData([
              { name: "Gold", value: countryMedals.predicted_gold_medals },
              { name: "Silver", value: countryMedals.predicted_silver_medals },
              { name: "Bronze", value: countryMedals.predicted_bronze_medals },
            ]);
          }
        }}
        style={{ marginBottom: 20 }}
      />
      {medalData.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <PieChart width={500} height={500}>
            <Pie
              data={medalData}
              cx="50%"
              cy="50%"
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {medalData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend width={500} />
          </PieChart>
        </Box>
      ) : (
        <p style={{ width: "max-content", margin: "56px auto" }}>
          Select a country
        </p>
      )}
    </Container>
  );
};

export default CountryMedalChart;

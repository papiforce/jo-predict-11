import {
  Autocomplete,
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analysis = () => {
  const [countries, setCountries] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [yearlyMedalsData, setYearlyMedalsData] = useState([]);
  const [countryMedals, setCountryMedals] = useState([]);
  const [isYearsLoading, setIsYearsLoading] = useState(true);
  const [isCountriesLoading, setIsCountriesLoading] = useState(true);
  const [isAthletesLoading, setIsAthletesLoading] = useState(true);
  const [isMedalsPerYearLoading, setIsMedalsPerYearLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getMedalsPerYear = async (value) => {
    const response = await fetch(`${apiUrl}/medals?year=${value}`);
    const data = await response.json();
    setYearlyMedalsData(data);
    setIsMedalsPerYearLoading(false);
  };

  const getMedalsPerCountry = async (value) => {
    const response = await fetch(`${apiUrl}/medals?country_name=${value}`);
    const data = await response.json();
    setCountryMedals(data);
  };

  const getAthletes = async (value) => {
    if (value) {
      const response = await fetch(`${apiUrl}/athletes?country_name=${value}`);
      const data = await response.json();
      setAthletes(data);
    } else {
      const response = await fetch(`${apiUrl}/athletes`);
      const data = await response.json();
      setAthletes(data);
    }
    setIsAthletesLoading(false);
  };

  const getAllYears = async () => {
    const response = await fetch(`${apiUrl}/years`);
    const data = await response.json();
    setYears(data);
    setIsYearsLoading(false);
  };

  const getAllCountries = async () => {
    const response = await fetch(`${apiUrl}/countries`);
    const data = await response.json();
    setCountries(data);
    setIsCountriesLoading(false);
  };

  useEffect(() => {
    getMedalsPerYear(2020);
    getAllYears();
    getAllCountries();
    getAthletes();
  }, []);

  if (
    isYearsLoading ||
    isCountriesLoading ||
    isAthletesLoading ||
    isMedalsPerYearLoading
  ) {
    return (
      <p style={{ width: "max-content", margin: "56px auto" }}>Loading...</p>
    );
  }

  return (
    <Container sx={{ overflowY: "auto", maxHeight: "100vh", paddingBottom: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: "2rem" }}
      >
        Olympic Games Analysis
      </Typography>

      <Box sx={{ marginBottom: "4rem" }}>
        <Autocomplete
          options={years}
          getOptionLabel={(option) => `${option}`}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField {...params} label="Select Year" variant="outlined" />
          )}
          value={selectedYear}
          onChange={(event, newValue) => {
            setSelectedYear(newValue);
            getMedalsPerYear(newValue);
          }}
          style={{ marginBottom: 56 }}
        />

        {selectedYear && (
          <>
            <Typography variant="h5" gutterBottom>
              Country with the Most Medals in {selectedYear}
            </Typography>
            {yearlyMedalsData.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell>Total Medals</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {yearlyMedalsData
                      .sort((a, b) => b.total_medals - a.total_medals)
                      .slice(0, 1)
                      .map((country, index) => (
                        <TableRow key={index}>
                          <TableCell>{country.country_name}</TableCell>
                          <TableCell>{country.total_medals}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No data available for {selectedYear}</Typography>
            )}

            <Typography variant="h5" gutterBottom style={{ marginTop: "4rem" }}>
              Top 10 Countries by Medals in {selectedYear}
            </Typography>
            <BarChart
              width={1100}
              height={300}
              data={yearlyMedalsData.slice(0, 10)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country_name" tick={{ fontSize: 14 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gold_count" fill="#FFD700" name="Gold Medals" />
              <Bar dataKey="silver_count" fill="#C0C0C0" name="Silver Medals" />
              <Bar dataKey="bronze_count" fill="#CD7F32" name="Bronze Medals" />
            </BarChart>
          </>
        )}
      </Box>

      <Box sx={{ marginBottom: "4rem" }}>
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField {...params} label="Select Country" variant="outlined" />
          )}
          value={selectedCountry}
          onChange={(event, newValue) => {
            setSelectedCountry(newValue);
            getAthletes(newValue);
            getMedalsPerCountry(newValue);
          }}
          style={{ marginBottom: 20 }}
        />

        {selectedCountry && (
          <>
            <Typography variant="h5" gutterBottom>
              Medals Over the Years for {selectedCountry}
            </Typography>
            <LineChart width={1100} height={500} data={countryMedals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 14 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_medals"
                stroke="#8884d8"
                name="Total Medals"
              />
            </LineChart>
          </>
        )}

        <Typography variant="h5" gutterBottom style={{ marginTop: "4rem" }}>
          Top 10 Athletes {selectedCountry && `of ${selectedCountry}`} by Total
          Medals
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Athlete</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Total Medals</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {athletes.map((athlete, index) => (
                <TableRow key={index}>
                  <TableCell>{athlete.athlete_full_name}</TableCell>
                  <TableCell>{athlete.country_name}</TableCell>
                  <TableCell>{athlete.total_medals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Analysis;

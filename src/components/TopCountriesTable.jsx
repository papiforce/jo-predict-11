/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TopCountriesTable = ({ predictions }) => {
  return (
    <Box mt={5} p={3}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: "2rem" }}
      >
        Top 25 Predicted Countries
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Total Medals</TableCell>
              <TableCell>Total Gold Medals</TableCell>
              <TableCell>Total Silver Medals</TableCell>
              <TableCell>Total Bronze Medals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.sort((a, b) => {
                const sumA =
                  a.predicted_gold_medals +
                  a.predicted_silver_medals +
                  a.predicted_bronze_medals;
                const sumB =
                  b.predicted_gold_medals +
                  b.predicted_silver_medals +
                  b.predicted_bronze_medals;
                return sumB - sumA;
              }).map((country, index) => (
              <TableRow key={index}>
                <TableCell>{country.country_name}</TableCell>
                <TableCell>
                  {country.predicted_gold_medals +
                    country.predicted_silver_medals +
                    country.predicted_bronze_medals}
                </TableCell>
                <TableCell>{country.predicted_gold_medals}</TableCell>
                <TableCell>{country.predicted_silver_medals}</TableCell>
                <TableCell>{country.predicted_bronze_medals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopCountriesTable;

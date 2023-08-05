import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import propertiesData from "./propertiesMock";

const MarketInsight = () => {
  // Helper function to calculate the median value
  const calculateMedian = (arr) => {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
    return sortedArr.length % 2 !== 0
      ? sortedArr[mid]
      : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  };

  // Helper function to calculate the mean value
  const calculateMean = (arr) =>
    arr.reduce((acc, val) => acc + val, 0) / arr.length;

  // Filter properties by room count
  const propertiesWith1Room = propertiesData.filter(
    (property) => property.numberOfRooms === 1
  );
  const propertiesWith2Rooms = propertiesData.filter(
    (property) => property.numberOfRooms === 2
  );
  const propertiesWith3Rooms = propertiesData.filter(
    (property) => property.numberOfRooms === 3
  );
  const propertiesWith4Rooms = propertiesData.filter(
    (property) => property.numberOfRooms === 4
  );

  // Extract property prices and surfaceSquareMeters
  const allPrices = propertiesData.map((property) => property.price);
  const allSurfaceSquareMeters = propertiesData.map(
    (property) => property.surfaceSquareMeters
  );

  // Calculate median and mean prices for each room type
  const medianPrices = [
    calculateMedian(propertiesWith1Room.map((property) => property.price)),
    calculateMedian(propertiesWith2Rooms.map((property) => property.price)),
    calculateMedian(propertiesWith3Rooms.map((property) => property.price)),
    calculateMedian(propertiesWith4Rooms.map((property) => property.price)),
    calculateMedian(allPrices),
  ];

  const meanPrices = [
    calculateMean(propertiesWith1Room.map((property) => property.price)),
    calculateMean(propertiesWith2Rooms.map((property) => property.price)),
    calculateMean(propertiesWith3Rooms.map((property) => property.price)),
    calculateMean(propertiesWith4Rooms.map((property) => property.price)),
    calculateMean(allPrices),
  ];

  // Calculate price per square meter for each property
  const pricePerSquareMeter = propertiesData.map(
    (property) => property.price / property.surfaceSquareMeters
  );

  // Calculate the overall mean price per square meter
  const overallMeanPricePerSquareMeter = calculateMean(pricePerSquareMeter);

  // Colors for the pie charts
  const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Colors for the line chart
  const LINE_COLOR = "#8884d8";

  const totalPrice1Room = propertiesWith1Room.reduce(
    (total, property) => total + property.price,
    0
  );
  const totalSurfaceSqM1Room = propertiesWith1Room.reduce(
    (total, property) => total + property.surfaceSquareMeters,
    0
  );
  const averagePricePerSqM1Room = totalPrice1Room / totalSurfaceSqM1Room;

  // Calculate average price per square meter for properties with 2 rooms
  const totalPrice2Rooms = propertiesWith2Rooms.reduce(
    (total, property) => total + property.price,
    0
  );
  const totalSurfaceSqM2Rooms = propertiesWith2Rooms.reduce(
    (total, property) => total + property.surfaceSquareMeters,
    0
  );
  const averagePricePerSqM2Rooms = totalPrice2Rooms / totalSurfaceSqM2Rooms;

  // Calculate average price per square meter for properties with 3 rooms
  const totalPrice3Rooms = propertiesWith3Rooms.reduce(
    (total, property) => total + property.price,
    0
  );
  const totalSurfaceSqM3Rooms = propertiesWith3Rooms.reduce(
    (total, property) => total + property.surfaceSquareMeters,
    0
  );
  const averagePricePerSqM3Rooms = totalPrice3Rooms / totalSurfaceSqM3Rooms;

  // Calculate average price per square meter for properties with 4 rooms
  const totalPrice4Rooms = propertiesWith4Rooms.reduce(
    (total, property) => total + property.price,
    0
  );
  const totalSurfaceSqM4Rooms = propertiesWith4Rooms.reduce(
    (total, property) => total + property.surfaceSquareMeters,
    0
  );
  const averagePricePerSqM4Rooms = totalPrice4Rooms / totalSurfaceSqM4Rooms;

  const lineChartData = propertiesData.map((property) => ({
    id: property.id,
    surfaceSquareMeters: property.surfaceSquareMeters,
    price: property.price,
  }));

  const totalPriceAllProperties = propertiesData.reduce(
    (total, property) => total + property.price,
    0
  );
  const totalSurfaceSqMAllProperties = propertiesData.reduce(
    (total, property) => total + property.surfaceSquareMeters,
    0
  );
  const averagePricePerSqMAllProperties =
    totalPriceAllProperties / totalSurfaceSqMAllProperties;

  const BAR_COLOR = "#8884d8";

  const barChartData = [
    { name: "1 Room", value: averagePricePerSqM1Room },
    { name: "2 Rooms", value: averagePricePerSqM2Rooms },
    { name: "3 Rooms", value: averagePricePerSqM3Rooms },
    { name: "4 Rooms", value: averagePricePerSqM4Rooms },
    { name: "All Properties", value: averagePricePerSqMAllProperties },
  ];

  return (
    <Box mt={4}>
      <Box display="flex" justifyContent="center">
        <Box mt={2}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            color="grey"
            sx={{ fontWeight: "bold" }}
          >
            Median Prices by Room Count
          </Typography>
          <PieChart width={570} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={[
                { name: "1 Room", value: Math.round(medianPrices[0]) },
                { name: "2 Rooms", value: Math.round(medianPrices[1]) },
                { name: "3 Rooms", value: Math.round(medianPrices[2]) },
                { name: "4 Rooms", value: Math.round(medianPrices[3]) },
                { name: "All Types", value: Math.round(medianPrices[4]) },
              ]}
              outerRadius={170}
              fill="#8884d8"
              label={{ fontSize: 22 }}
            >
              {medianPrices.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend fontSize={26} />
          </PieChart>
        </Box>
        <Box mt={2}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            color="grey"
            sx={{ fontWeight: "bold" }}
          >
            Mean Prices by Room Count
          </Typography>
          <PieChart width={570} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={[
                { name: "1 Room", value: Math.round(meanPrices[0]) },
                { name: "2 Rooms", value: Math.round(meanPrices[1]) },
                { name: "3 Rooms", value: Math.round(meanPrices[2]) },
                { name: "4 Rooms", value: Math.round(meanPrices[3]) },
                { name: "All Types", value: Math.round(meanPrices[4]) },
              ]}
              outerRadius={170}
              fill="#8884d8"
              label={{ fontSize: 22 }}
            >
              {meanPrices.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend fontSize={20} />
          </PieChart>
        </Box>
      </Box>

      <Box mt={4} marginBottom="200" textAlign="-webkit-center">
        <Typography
          variant="h5"
          color="grey"
          gutterBottom
          sx={{ mt: "70px", mb: "30px", fontWeight: "bold" }}
        >
          Price Per Square Meter Trend
        </Typography>
        <ResponsiveContainer width="60%" marginBottom="200" height={300}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="surfaceSquareMeters">
              <Label
                value="Surface Square Meters"
                offset={42}
                position="insideBottom"
                fontSize={20}
              />
            </XAxis>
            <YAxis>
              <Label
                value="Price (EUR)"
                angle={-90}
                offset={80}
                position="insideLeft"
                fontSize={20}
              />
            </YAxis>
            <Line
              type="monotone"
              dataKey="price"
              stroke={LINE_COLOR}
              strokeWidth={2}
              dot={false}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "grey" }}
          >
            Average Price per Sq Meter for Properties with 1 Room:{" "}
            {averagePricePerSqM1Room.toFixed(2)} EUR
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "grey" }}
          >
            Average Price per Sq Meter for Properties with 2 Rooms:{" "}
            {averagePricePerSqM2Rooms.toFixed(2)} EUR
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "grey" }}
          >
            Average Price per Sq Meter for Properties with 3 Rooms:{" "}
            {averagePricePerSqM3Rooms.toFixed(2)} EUR
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "grey" }}
          >
            Average Price per Sq Meter for Properties with 4 Rooms:{" "}
            {averagePricePerSqM4Rooms.toFixed(2)} EUR
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "grey" }}
          >
            Overall Average Price per Sq Meter:{" "}
            {averagePricePerSqMAllProperties.toFixed(2)} EUR
          </Typography>
        </Box>

        <Box mt={3}>
          <ResponsiveContainer width="60%" height={400}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name"></XAxis>
              <YAxis>
                <Label
                  value="Average Price (EUR/sqm)"
                  angle={-90}
                  position="insideLeft"
                  style={{ marginBottom: 10 }}
                />
              </YAxis>
              <Bar dataKey="value" fill={BAR_COLOR} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="h4" color="grey" mt={3} mb={5}>
            {" "}
            Interested? Give us a call!{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MarketInsight;

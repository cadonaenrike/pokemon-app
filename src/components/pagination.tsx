import React from "react";
import { Pagination, Box, IconButton } from "@mui/material";

interface CustomPaginationProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  onChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onChange(event as React.ChangeEvent<unknown>, value);
  };

  return (
    <Box
      mt={2}
      textAlign="center"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
      }}
    >
      <IconButton
        onClick={() =>
          onChange(
            null as unknown as React.ChangeEvent<unknown>,
            Math.max(page - 1, 1)
          )
        }
        disabled={page === 1}
        sx={{ position: "absolute", left: "10px" }}
      >
        <img
          src="./src/assets/back.png"
          alt="Back"
          style={{ width: "24px", height: "24px" }}
        />
      </IconButton>

      <Pagination count={count} page={page} onChange={handlePageChange} />

      <IconButton
        onClick={() =>
          onChange(
            null as unknown as React.ChangeEvent<unknown>,
            Math.min(page + 1, count)
          )
        }
        disabled={page === count}
        sx={{ position: "absolute", right: "10px" }}
      >
        <img
          src="./src/assets/next.png"
          alt="Back"
          style={{ width: "24px", height: "24px" }}
        />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;

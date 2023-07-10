import { Helmet } from "react-helmet-async";
import { filter, reverse } from "lodash";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Button,
} from "@mui/material";
// components
// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
import useActionPrivate from "../../hooks/useActionPrivate";
import { API_ROUTES, API_URL, APP_ROUTES } from "../../utils/url";
import { useNavigate } from "react-router-dom";
import Label from "../../components/label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "chek", label: "", alignRight: false },
  { id: "Envoyeur", label: "Envoyeur", alignRight: false },
  { id: "Patient", label: "Patients", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "visuliser", label: "Visualiser", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      let user = _user?.envoyeur.first_name + " " + _user?.envoyeur?.last_name;
      return user.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DicomReceve() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const axiosPrivate = useActionPrivate();
  const [dicoms, setDicom] = useState([]);
  useEffect(() => {
    axiosPrivate
      .get(API_URL + API_ROUTES.CONNECTEDUSER)
      .then((res) => {
        setDicom(reverse(res.data.user.images_reçus));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosPrivate]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dicoms.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dicoms.length) : 0;

  const filteredUsers = applySortFilter(
    dicoms,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredUsers.length && !!filterName;
  const handleRedirect = (event, dicom) => {
    navigate(APP_ROUTES.DICOMSRECEVED + "/" + dicom.id);
    event.stopPropagation();
  };
  return (
    <>
      <Helmet>
        <title> My DICOM files </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Liste des fichiers DICOM que vous avez Reçu
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dicoms.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.map((dicom) => {
                  return (
                    <TableRow
                      hover
                      key={dicom.id}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={(event) =>
                            handleClick(event, dicom.envoyeur.firstname)
                          }
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                      ></TableCell>

                      <TableCell align="left">
                        {dicom?.envoyeur?.first_name +
                          " " +
                          dicom?.envoyeur.last_name}
                      </TableCell>

                      <TableCell align="left">
                        {dicom?.patient?.first_name +
                          " " +
                          dicom?.patient.last_name}
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          color={
                            (dicom.rapport === null && "error") || "success"
                          }
                        >
                          {dicom.rapport === null ? "en attente" : "traiter"}
                        </Label>
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleRedirect(event, dicom)}
                        align="left"
                      >
                        <Button variant="text">voir</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          Pas d'images trouvé pour un radiologue avec comme nom
                          &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Essayer avec un autre nom
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}

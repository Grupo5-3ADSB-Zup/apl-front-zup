import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Button } from '@mui/material';
import WidgetWrapper from "components/WidgetWrapper";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from 'scenes/navbar';

const AdminWidget = () => {
  const [influencers, setInfluencers] = useState([]);


  const getUser = async () => {

    try {
      const response = await axios.get("http://localhost:8080/admin");
      setInfluencers(response.data);
    } catch (error) {
      console.log('Erro ao obter as postagens:', error);
    }
  };

  const handleDeleteToggle = (id) => {
    const updatedInfluencers = influencers.map((influencer) =>
      influencer.id === id ? { ...influencer, isDeleteEnabled: influencer.isDeleteEnabled } : influencer
    );
    setInfluencers(updatedInfluencers);
  };
 
  const handleGenerateFile = async () => {
    const fileName = prompt('Digite o nome do arquivo') || 'arquivo';

    try {
      const response = await axios.get(`http://localhost:8080/admin/csv/${fileName}`, {
        filename: fileName,
      }, {
        responseType: 'blob',
      });

      const fileUrl = URL.createObjectURL(response.data);

      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
      <TableContainer style={{ width: '80%' }}>
        <WidgetWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Identificador</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Influenciador</TableCell>
                <TableCell>Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>{influencer.id}</TableCell>
                  <TableCell>{influencer.nome}</TableCell>
                  <TableCell>{influencer.email}</TableCell>
                  <TableCell>
                    <Switch
                      onChange={() => handleDeleteToggle(influencer.id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Delete"
                    // onClick={() => handleDelete(influencer.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </WidgetWrapper>
      </TableContainer>
      <Button variant="contained" onClick={handleGenerateFile} style={{marginTop: "16px"}}>
        Gerar Arquivo
      </Button>
    </div>
  );
};

export default AdminWidget;

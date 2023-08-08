import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Button, useTheme } from '@mui/material';
import WidgetWrapper from "components/WidgetWrapper";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from 'scenes/navbar';

const AdminWidget = () => {
  const [influencers, setInfluencers] = useState([]);
  const [isActiveMap, setIsActiveMap] = useState({});

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;
  const primaryColor = '#F2CB05';

  const handleImportFile = async () => {
    const input = document.createElement('input');
    input.type = 'file';
  
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('arquivo', file);
  
      try {
        await axios.post('https://apl-back-end-zup.azurewebsites.net/admin/importacao/txt', formData);
  
        alert('Arquivo importado com sucesso!');
      } catch (error) {
        console.error('Erro ao importar o arquivo:', error);
      }
    };
  
    input.click();
  };
  

  const getUser = async () => {
    try {
      const response = await axios.get("https://apl-back-end-zup.azurewebsites.net/admin");
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://apl-back-end-zup.azurewebsites.net/usuario/${id}`);
      getUser(); // Atualiza a lista de usuários após a exclusão
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateFile = async () => {
    const fileName = prompt('Digite o nome do arquivo') || 'arquivo';

    try {
      const response = await axios.get(`https://apl-back-end-zup.azurewebsites.net/admin/csv/${fileName}`, {
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

  const handleSwitchChange = async (id, isActive) => {
    try {
      const response = await axios.put(`https://apl-back-end-zup.azurewebsites.net/admin/influencer/comum/${id}/${!isActive}`);
      setIsActiveMap((prevState) => ({
        ...prevState,
        [id]: response.data.influencer,
      }));
    } catch (error) {
      // Handle error during status update
      console.log("Error updating influencer status:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TableContainer style={{ width: '80%' }}>
          <h1 style={{ color: primaryColor, marginBottom: '10px', fontSize: '20px' }}>Admin-Permissionamento</h1>
          <WidgetWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Identificador</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Influenciador</TableCell>
                  <TableCell>Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {influencers.map((influencer) => (
                  <TableRow key={influencer.id}>
                    <TableCell>{influencer.id}</TableCell>
                    <TableCell>{influencer.nome}</TableCell>
                    <TableCell>{influencer.username}</TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={isActiveMap[influencer.id] || false}
                        onChange={() => handleSwitchChange(influencer.id, isActiveMap[influencer.id] || false)}
                      />

                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handleDelete(influencer.id)} // Chama a função handleDelete com o ID do influenciador
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
        <div style={{ display: 'flex', marginTop: '16px' }}>
          <Button variant="contained" onClick={handleGenerateFile} style={{ marginRight: '8px' }}>
            Gerar Arquivo
          </Button>
          <Button variant="contained" onClick={handleImportFile}>
            Importar Arquivo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminWidget;

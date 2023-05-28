import {
    Box, Divider, IconButton, Typography, useTheme, Button, Input,
    Modal,
  } from "@mui/material";

const ModalWidget = () => {
    return(
        <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    width: '400px',
                    maxWidth: '95%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Compartilhar Publicação
                  </Typography>
                  <form onSubmit={handleModalSubmit}>
                    <Input
                      placeholder="Digite um titulo"
                      values={titulo}
                      onChange={handleQuestionChange}
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                    <Input
                      placeholder="Digite uma pergunta"
                      values={pergunta}
                      onChange={handleAnswerChange}
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ marginBottom: '10px' }}
                    />
                    <Input
                      placeholder="Digite uma pergunta"
                      values={resposta}
                      fullWidth
                      multiline
                      rows={10}
                      sx={{ marginBottom: '10px' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={handleModalSubmit} type="submit" variant="contained" sx={{ marginLeft: '10px' }}>
                        Enviar
                      </Button>
                      <Button onClick={handleModalClose} variant="contained" sx={{ marginLeft: '10px' }}>
                        Cancelar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Modal>
    )
}
import CerereDisertatie, { CerereDisertatieAttributes, CerereDisertatieCreationAttributes } from "../entities/CerereDisertatie";
import Utilizator from "../entities/Utilizator";


CerereDisertatie.belongsTo(Utilizator, { foreignKey: 'UserId', as: 'utilizator' });

async function getCereriAndUsers() {
  return await CerereDisertatie.findAll({
    include: [
      {
        model: Utilizator,
        as: "utilizator",
        attributes: ['UserId', 'UserName', 'UserSurName', 'Type', 'UserPhone', 'UserEmail'],
      },
    ],
  });
}

async function createCerere(cerere: CerereDisertatieCreationAttributes) {
    return await CerereDisertatie.create(cerere);
  }

  
async function getCerereById(id: number) {
    return await CerereDisertatie.findByPk(id);
  }
  
  async function deleteCerere(id: number) {
    let deleteElem = await CerereDisertatie.findByPk(id);
  
    if (!deleteElem) {
      console.log("This element does not exist, so it cannot be deleted");
      return;
    }
    return await deleteElem.destroy();
  
  }



  async function updateCerere(id: number, updatedCerere: CerereDisertatieCreationAttributes) {
    const existingCerere = await CerereDisertatie.findByPk(id);
  
    if (!existingCerere) {
      console.log("This element does not exist, so it cannot be updated");
      return null; 
    }
    await existingCerere.update(updatedCerere);
      return existingCerere;
  }


  /////////////////////////////

  async function getToateCererile() {
    try {
      const toateCererile = await CerereDisertatie.findAll();
      return toateCererile;
    } catch (error:any) {
      console.error('Eroare la obținerea cererilor:', error.message);
      throw error;
    }
  }
 
  
  const getCerereByProfesor = async (profesor: string) => {
    return await CerereDisertatie.findAll({
      where: { Profesor: profesor },
    });
  };
  
  

  export {
    createCerere,
    getCerereById,
    deleteCerere,
    getCereriAndUsers,
    updateCerere,
    getToateCererile,
    getCerereByProfesor,
  }
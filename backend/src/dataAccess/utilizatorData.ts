import Utilizator, { UtilizatorAttributes, UtilizatorCreationAttributes } from "../entities/Utilizator";
import CerereDisertatie from "../entities/CerereDisertatie";
import { CereriDisertatie } from "../entities/dbConst";
import { Like } from "./operators";
import utilizatorFilterDto from "./models/utilizatorFilterDto";
import db from "../dbConfig";
import { Model } from "sequelize";


async function createUtilizator(utilizator: UtilizatorCreationAttributes) {
  return await Utilizator.create(utilizator);
}

async function getUtilizatori(utilizatorFilter: utilizatorFilterDto) {

  if (!utilizatorFilter.take)
  utilizatorFilter.take = 10;

  if (!utilizatorFilter.skip)
  utilizatorFilter.skip = 0;

  let whereClause: any = {};
  if (utilizatorFilter.Name)
    whereClause.UserName = { [Like]: `%${utilizatorFilter.Name}%` };

  if (utilizatorFilter.Surname)
    whereClause.UserSurName = { [Like]: `%${utilizatorFilter.Surname}%` };

  return await Utilizator.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: utilizatorFilter.take,
      offset: utilizatorFilter.skip * utilizatorFilter.take,
    });

}

async function getUtilizatorById(id: number) {
  return await Utilizator.findByPk(id);
}

async function deleteUtilizator(id: number) {
  let deleteElem = await Utilizator.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateUtilizator(utilizator: UtilizatorCreationAttributes, id: number) {
  const findUtilizator = await getUtilizatorById(utilizator.UserId);

  if (!findUtilizator) {
    console.log("This user does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findUtilizator.update(utilizator);

    // deleted
    const existCerere = await CerereDisertatie.findAll({
      where: {
        UserId: utilizator.UserId,
      },
    });

    if (existCerere.length > 0) {
      let cerereIds = existCerere.map(a => a.dataValues.Id);
      let cerereIdsDeleted = cerereIds.filter(id => !utilizator.Cereri.find(add => add.Id === id)?.Id)
      if (cerereIdsDeleted.length > 0)
        await CerereDisertatie.destroy({
          where: {
            Id: cerereIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = utilizator.Cereri.filter(a => a.Id === 0)
    if (insertedA.length > 0)
      await CerereDisertatie.bulkCreate(insertedA)

    // updated
    const updatedA = utilizator.Cereri.filter(a => a.Id !== 0);
    if (updatedA.length > 0) {
      for (let item of updatedA) {
        const findA = await CerereDisertatie.findByPk(item.Id);
        await findA?.update(item);
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}



async function checkUserCredentials(UserEmail: string, Password: string) {
  try {
    const user = await Utilizator.findOne({
      where: {
        UserEmail: UserEmail,
        Password: Password,
      },
      raw: true, // Adaugă această opțiune pentru a obține rezultate în format raw (fără a fi obiecte Sequelize)
    });

    // În loc să returnezi doar true/false, poți returna utilizatorul sau null pentru a avea acces la tipul de utilizator
    return user || null;
  } catch (error) {
    console.error('Eroare la verificarea credențialelor:', error);
    throw new Error('Eroare la verificarea credențialelor');
  }
}


async function getProfessorIdByEmail(email: string): Promise<number | null> {
  try {
    const utilizator = await Utilizator.findOne({
      where: {
        UserEmail: email,
        UserType: 'Profesor', 
      } as any, 
      attributes: ['UserId'],
      raw: true,
    });
    

    return utilizator ? (utilizator as any).UserId as number : null;

  } catch (error) {
    console.error('Eroare la obținerea ID-ului profesorului:', error);
    throw new Error('Eroare la obținerea ID-ului profesorului');
  }
}


export {
  createUtilizator,
  getUtilizatorById,
  getUtilizatori,
  deleteUtilizator,
  updateUtilizator,
  checkUserCredentials,
  getProfessorIdByEmail,
}
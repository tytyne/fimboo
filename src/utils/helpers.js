import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 15);
  return hash;
};
const decryptPassword = async (dataTodecrypt, dataBaseHash) => {
  const deHashedPassword = await bcrypt.compare(dataTodecrypt, dataBaseHash);
  return deHashedPassword;
};

const changeDate =(birthDate)=>{
  let birthday=new Date(birthDate)
  let ageDifMs = Date.now() - birthday.getTime();
  let  ageDate = new Date(ageDifMs); // miliseconds from epoch
  let result = Math.abs(ageDate.getUTCFullYear() - 1970);

  return result;
}

export default {
  hashPassword,
  decryptPassword,
  changeDate

};

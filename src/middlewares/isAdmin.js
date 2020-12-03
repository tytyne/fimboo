const isAdmin = (req, res, next) => {
  if (!(req.user.email === 'admin@example.com')) return res.status(403).json({message:"Access denied"}); 
  console.log(req.user.email)
  next();
};

export default isAdmin;

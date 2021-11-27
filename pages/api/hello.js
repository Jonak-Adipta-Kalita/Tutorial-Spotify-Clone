const helloAPI = (req, res) => {
  res.status(200).json({ name: "JAK Spotify Clone", realName: "Spotify" });
};

export default helloAPI;

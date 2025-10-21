export default function getImage(filename) {
  return process.env.REACT_APP_APIHOST + "/img/" + filename;
}

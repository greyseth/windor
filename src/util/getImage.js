export default function getImage(filename) {
  return import.meta.env.VITE_APIHOST + "/img/" + filename;
}


function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Geoglypha</p>
      <p>
        <a href="#" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
export default Footer
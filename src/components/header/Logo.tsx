export default function Logo() {
  return (
    <a href={'/'} className="flex items-center flex-shrink-0">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="European Arbitration Chamber Logo" 
        className="h-12 w-auto" 
        style={{ maxWidth: '100%' }}
      />
    </a>
  );
}

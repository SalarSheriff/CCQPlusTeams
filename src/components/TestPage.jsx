import CompanyDisplayPaper from "./CompanyDisplayPaper";

function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <CompanyDisplayPaper company="A1" mascot="Assasins" buttonText="Sign In" handleSelectCompany={() => {}} />
    </div>
  );
}

export default TestPage;
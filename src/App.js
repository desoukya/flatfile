import React, { useState, useEffect } from "react";
import FlatfileImporter from "@flatfile/adapter";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const LICENSE_KEY = "70cbe3fa-b6ba-4943-be91-c2b93060c496";
const importer = new FlatfileImporter(LICENSE_KEY, {
  type: "imports",
  fields: [
    { key: "City", label: "City" },
    { key: "State", label: "State" }
  ],
  managed: true,
  webhookUrl: 'https://webhook.site/9d415116-003b-4af6-b648-2d4c4f58db82',
});

function App() {
  const [results, setResults] = useState('Your output will appear here');

  const renderTooltip = props => (
    <Tooltip {...props}>Upload your CSV</Tooltip>
  );
  const launchFlatFile = async () => {
    const userData = await importer.requestDataFromUser();
    console.log('userData :>> ', userData);
    importer.displayLoader();
    setTimeout(() => {
      importer.displaySuccess("CSV File Successfully Uploaded!");
      setResults(JSON.stringify(userData.validData, null, 2));
    }, 1500);
  };

  useEffect(() => {
    importer.setCustomer({
      userId: "1",
      name: "Amr Desouky"
    });
  }, []);

  return (
    <div className="App">
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <Button onClick={launchFlatFile}>Upload CSV</Button>
      </OverlayTrigger>
      <FloatingLabel controlId="floatingTextarea" label={results} className="mb-3">
        <Form.Control as="textarea" />
      </FloatingLabel>
    </div>
  );
}

export default App;

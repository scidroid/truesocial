import { Button } from "@mantine/core";
import { Identity } from "deso.js";

const identity = Identity.init();

const DeSoButton = ({
  onSuccess,
  onFailure,
  accessLevel,
  children,
  ...props
}) => {
  const handleLogin = async () => {
    try {
      const response = await identity.login({ accessLevel });
      const publicKey = response.publicKeyAdded;
      const user = response.users[publicKey];
      onSuccess({
        publicKey,
        ...user,
      });
    } catch (err) {
      onFailure(err);
    }
  };

  return (
    <Button onClick={handleLogin} {...props}>
      {children}
    </Button>
  );
};

export default DeSoButton;

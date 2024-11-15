import { getCredentialsForUser } from "@/actions/credentials";
import { FC } from "react";
import { Card } from "@/components/ui/card";
import { LockKeyhole, ShieldOff } from "lucide-react";
import CreateCredentialDialog from "./create-credential-dialog";
import { formatDistanceToNow } from "date-fns";
import DeleteCredentialDialog from "./delete-credential-dialog";

const UserCredentials: FC = async () => {
  const credentials = await getCredentialsForUser();

  if (!credentials) {
    return <div className="">Something went wrong</div>;
  }

  if (credentials.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center">
            <ShieldOff size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-bold">No credentials created yet</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first credential
            </p>
          </div>

          <CreateCredentialDialog triggerText="Create your first credential" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });

        return (
          <Card key={credential.id} className="w-full p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                <LockKeyhole size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>

            <DeleteCredentialDialog name={credential.name} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserCredentials;

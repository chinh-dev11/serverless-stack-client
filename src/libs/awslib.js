import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
  console.log('stored',stored); // key: "1584207093094-Screen Shot 2020-03-13 at 16.11.18.png"

  return stored.key;
}
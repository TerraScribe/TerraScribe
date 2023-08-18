const extractTerraformFiles = (response: string): { [filename: string]: string } =>{
    const files: { [filename: string]: string } = {};

    // Extract file names and contents using regex
    const pattern = /\*\*([\w\.]+)\*\*\s*```terraform\s*([\s\S]+?)\s*```/g;
    let match;

    while ((match = pattern.exec(response)) !== null) {
        const [, filename, fileContent] = match;
        files[filename] = fileContent.trim();
    }

    return files;
}

export default extractTerraformFiles;
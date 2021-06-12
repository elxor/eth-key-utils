export const readFile = async (file) => {

    const content = await new Promise(resolve => {

        const name = file.name.length < 16
            ? file.name
            : file.name.slice(0, 7) + '...' + file.name.slice(-8);

        const reader = new FileReader();
        reader.onload = () => resolve([name, reader.result]);
        reader.readAsText(file);
    });

    return content;
}
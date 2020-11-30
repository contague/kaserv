async function getData() {
    let url = "menu";
    let list;
    let response = await fetch(url);

    if (response.ok) {

        let json = await response.json();
        list = await json;
    }
    return list;
}

export default getData;
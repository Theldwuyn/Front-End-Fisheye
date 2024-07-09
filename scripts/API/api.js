export async function getPhotographers() {
    
    const photographers = await fetch("./data/photographers.json")
                                .then(photographers => photographers.json());
    //console.log(photographers);
    return photographers;
}
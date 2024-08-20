const { useState, useEffect, useRef } = React

export function GetAnimalsList(){

    const  [animalInfos, setAnimalInfos] = useState ([ 
        {type: 'Malayan Tiger', count: 787}, 
        {type: 'Mountain Gorilla', count: 212}, 
        {type: 'Fin Whale', count: 28}, 
        ])

    const handleSearch = (animalType) => {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animalType)}`;
        window.open(searchUrl, '_blank');
      };

    return (
        <section>
            <h1>Rare Animals</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Seach on google</th>
                    </tr>
                </thead>
                <tbody>
                    {animalInfos.map((animal, index) => (
                        <tr key={index}>
                            <td>{animal.type}</td>
                            <td>{animal.count}</td>
                            <td> <a href="#" onClick={() => handleSearch(animal.type)}>Search</a> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}


import { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native-web";
import { Text, TextInput } from "react-native-paper";

export default function BuscarFrutas( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function BuscarFrutas() {
        const frutasRef = collection(db, 'frutas')
        const buscaFrutas = query(frutasRef, where('NomeFruta', '==', busca))
        const resultadoSnapshot = await getDocs(buscaFrutas);

        const listaFrutas = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaFrutas);
        setResultado(listaFrutas);
     }

    useEffect(
        () => {
           BuscarFrutas();
        }, [busca]
    )

    return (
        <View>
        <Text> Frutas </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.NomeCor}</Text>}
            />

        </View>
    )

}  
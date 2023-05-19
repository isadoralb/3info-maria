import { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native-web";
import { Text, TextInput } from "react-native-paper";

export default function BuscarAnimal( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function buscarAnimais() {
        const animalRef = collection(db, 'animais')
        const buscaAnimais = query(animalRef, where('NomeAnimal', '==', busca))
        const resultadoSnapshot = await getDocs(buscaAnimais);

        const listaAnimais = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaAnimais);
        setResultado(listaAnimais);
     }

    useEffect(
        () => {
           buscarAnimais();
        }, [busca]
    )

    return (
        <View>
        <Text> ANIMAL </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.NomeAnimal}</Text>}
            />

        </View>
    )

}
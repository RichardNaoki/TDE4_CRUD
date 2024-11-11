import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import  { useState } from "react";
import PersonRepository, { Person } from "../database/PersonRepository";
import React from "react";

const repository = new PersonRepository();

export default function Home() {
  const [name, setName] = useState<string>("");  
  const [people, setPeople] = useState<Person[]>([]);  

  const create = async () => {
    if (name.trim()) {
      const id = await repository.create({ name });  
      console.log("Criado com ID: ", id);
      setName("");  
    } else {
      alert("Por favor, coloque um nome válido");
    }
  };


  const all = async () => {
    const peopleList = await repository.all();
    setPeople(peopleList);  
    console.log(peopleList);  
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Coloque o nome da pessoa"
        style={styles.input}
      />
      
      <Button onPress={create} title="Adicionar" />
      
      <View style={styles.spacing} />
      
      <Button onPress={all} title="Mostrar Lista" />

      {people.map((person) => (
        <View key={person.id} style={styles.personItem}>
          <Text>{person.id} - {person.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  spacing: {
    height: 10, // Espaço entre os botões
  },
  personItem: {
    marginTop: 10, // Espaço entre os itens da lista
  },
});
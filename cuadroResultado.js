//Recibir cálculos de gas.js
let artefactosArray = JSON.parse(localStorage.getItem("arrayArtefactos"));

console.log(artefactosArray);

//Mostrar los resultados en una tabla

const tabla = document.getElementById("tabla");

artefactosArray.forEach((ele) => {
  /* $('#tabla').append(`
    <tr>
        <td>${ele.artefacto}</td>
        <td>${ele.costoM3}</td>
        <td>${ele.costo}</td>
        <td><input type = "number"></td>
        <td></td>
    </tr> 
    `) */
  //Creación elementos tabla

  const tablaR = document.createElement("tr");
  const tablaD = document.createElement("td");
  tablaD.innerHTML = ele.artefacto;
  const tablaE = document.createElement("td");
  tablaE.innerHTML = ele.costoM3;
  const tablaF = document.createElement("td");
  tablaF.innerHTML = ele.costo;
  const tablaG = document.createElement("td");
  const tablaGInput = document.createElement("input");
  tablaGInput.type = "number";

  tabla.appendChild(tablaR);
  tablaR.appendChild(tablaD);
  tablaR.appendChild(tablaE);
  tablaR.appendChild(tablaF);
  tablaG.appendChild(tablaGInput);
  tablaR.appendChild(tablaG);

  //Cálculos para saber cantidad de horas encendido y gasto mensual

  tablaGInput.addEventListener("change", () => {
    let horasDia = tablaGInput.value;
    let mes = horasDia * ele.costo * 30;

    const tablaH = document.createElement("td");
    tablaH.innerHTML = mes;

    tablaR.appendChild(tablaH);
  });
});

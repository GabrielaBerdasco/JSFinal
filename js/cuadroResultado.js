//GAS

//Recibir cálculos de gas.js
let artefactosArray = JSON.parse(sessionStorage.getItem("arrayArtefactos"));

console.log(artefactosArray);

//Mostrar los resultados en una tabla

const tabla = document.getElementById("tabla");

if (artefactosArray) {
  artefactosArray.forEach((ele) => {
    //Creación elementos tabla

    const tablaR = document.createElement("tr");
    const tablaD = document.createElement("td");
    tablaD.innerHTML = ele.artefacto;
    const tablaE = document.createElement("td");
    tablaE.innerHTML = ele.costoM3;
    const tablaF = document.createElement("td");
    tablaF.innerHTML = ele.tamaño;
    const tablaG = document.createElement("td");
    tablaG.innerHTML = ele.costo;
    const tablaH = document.createElement("td");
    const tablaHInput = document.createElement("input");
    tablaHInput.type = "number";

    tabla.appendChild(tablaR);
    tablaR.appendChild(tablaD);
    tablaR.appendChild(tablaE);
    tablaR.appendChild(tablaF);
    tablaR.appendChild(tablaG);
    tablaH.appendChild(tablaHInput);
    tablaR.appendChild(tablaH);

    //Cálculos para saber cantidad de horas encendido y gasto mensual

    tablaHInput.addEventListener("change", () => {
      let horasDia = tablaHInput.value;
      let mes = horasDia * ele.costo * 30;
      mes = mes.toFixed(2);

      const tablaI = document.createElement("td");
      tablaI.innerHTML = mes;

      tablaR.appendChild(tablaI);
    });
  });
}

//ELECTRICIDAD

//Recibir cálculos de electricidad.js
let aparatosArray = JSON.parse(sessionStorage.getItem("arrayAparatos"));

console.log(aparatosArray);

//Mostrar los resultados en una tabla

const tabla2 = document.getElementById("tabla2");

if (aparatosArray) {
  aparatosArray.forEach((ele) => {
    //Creación elementos tabla

    const tabla2R = document.createElement("tr");
    const tabla2D = document.createElement("td");
    tabla2D.innerHTML = ele.aparato;
    const tabla2E = document.createElement("td");
    tabla2E.innerHTML = ele.costokWh;
    const tabla2F = document.createElement("td");
    tabla2F.innerHTML = ele.costoElectrico;
    const tabla2G = document.createElement("td");
    const tabla2GInput = document.createElement("input");
    tabla2GInput.type = "number";

    tabla2.appendChild(tabla2R);
    tabla2R.appendChild(tabla2D);
    tabla2R.appendChild(tabla2E);
    tabla2R.appendChild(tabla2F);
    tabla2G.appendChild(tabla2GInput);
    tabla2R.appendChild(tabla2G);

    //Cálculos para saber cantidad de horas encendido y gasto mensual

    tabla2GInput.addEventListener("change", () => {
      let horasDia = tabla2GInput.value;
      let mes = horasDia * ele.costoElectrico * 30;
      mes = mes.toFixed(2);

      const tabla2H = document.createElement("td");
      tabla2H.innerHTML = mes;

      tabla2R.appendChild(tabla2H);
    });
  });
}

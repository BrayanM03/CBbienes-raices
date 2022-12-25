
function contextualMenu(id_item){ 
    $("#agregar-item").attr("onclick", `agregarACarrito(${id_item})`)
    $("#eliminar-item").attr("onclick", `eliminarProducto(${id_item})`)
    $("#ver-item").attr("onclick", `verRemision(${id_item})`)
    $("#eliminar-registro").attr("onclick", `eliminarRegistro(${id_item})`)


    let categoria = obtenerParametroGet("categoria")
    let subcategoria = obtenerParametroGet("subcategoria")
    $("#editar-item").attr("onclick", `editarProducto(${id_item}, '${categoria}', '${subcategoria}')`)

} 

const contextMenu = document.querySelector(".wrapper-cm")
const table = document.querySelector("#example")

table.addEventListener("contextmenu", e =>{
    contextMenu.classList.remove("animate__fadeIn");
    contextMenu.classList.add("animate__fadeIn");
     e.preventDefault();

  
    let x = e.pageX, y = e.pageY,
    winWidth = window.innerWidth,
    cmWidth = contextMenu.offsetWidth,
    winHeight = window.innerHeight,
    cmHeight = contextMenu.offsetHeight;

    console.log("Ancho ventana: "+winWidth);
    console.log("Ancho context menu: "+cmWidth);
    console.log("Posicion x: "+x);
    console.log("Posicion y: "+y);


    x = x > winWidth - cmWidth ? winWidth - cmWidth : x;   
    y = y > winHeight - cmHeight ? winHeight - cmHeight : y;


   
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;

    contextMenu.style.visibility="visible"
});

document.addEventListener("click", ()=> {
    contextMenu.classList.remove("animate__fadeIn");
    contextMenu.style.visibility="hidden"
});

function obtenerParametroGet(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
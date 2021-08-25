---
---
window.addEventListener("load", function () {
    document.getElementById("prevProject").onclick = onPrev

    document.getElementById("nextProject").onclick = onNext
})

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function onNext() {
    document.getElementById("projectDescription").innerHTML = '{% include projects/{{site.data.projects.light-node.subfolder}}/description.html %}'
    document.getElementById("projectTitle").innerHTML = '{{site.data.projects.light-node.title}}'

    setInnerHTML(document.getElementById("projectAnimation"), `{% include projects/{{site.data.projects.light-node.subfolder}}/animation.html %}`)
}

function onPrev() {
    document.getElementById("projectDescription").innerHTML = '{% include projects/{{site.data.projects.speed.subfolder}}/description.html %}';
    document.getElementById("projectTitle").innerHTML = '{{site.data.projects.speed.title}}';

    setInnerHTML(document.getElementById("projectAnimation"), `{% include projects/{{site.data.projects.speed.subfolder}}/animation.html %}`)
}

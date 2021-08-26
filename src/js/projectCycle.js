---
---

const projectRendered = []
{% for project in site.data.projects.entries %}
    projectRendered.push({
        title: `{{project.title }}`,
        animation: `{% include projects/{{project.subfolder}}/animation.html %}`,
        description: `{% include projects/{{project.subfolder}}/description.html %}`
    })
{% endfor %}

let currentProject = 0;

window.addEventListener("load", function () {
    document.getElementById("prevProject").onclick = onPrev

    document.getElementById("nextProject").onclick = onNext

    document.getElementById("prevProject").click()
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
    currentProject++;

    if (projectRendered[currentProject] === undefined) {
        currentProject = 0;
    }

    sharedCycle()
}

function onPrev() {
    currentProject--;

    if (currentProject < 0) {
        currentProject = projectRendered.length - 1;
    }

    sharedCycle()
}

function sharedCycle() {
    document.getElementById("projectDescription").innerHTML = projectRendered[currentProject].description;
    document.getElementById("projectTitle").innerHTML = projectRendered[currentProject].title;

    setInnerHTML(document.getElementById("projectAnimation"), projectRendered[currentProject].animation)

    if (document.getElementById("projectAnimation").innerHTML === "") {
        document.getElementById("projectAnimation").classList.add("hidden")
    } else {
        document.getElementById("projectAnimation").classList.remove("hidden")
    }
}
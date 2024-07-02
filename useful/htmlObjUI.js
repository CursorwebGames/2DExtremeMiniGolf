// haven't found a need for any extend state
// probably because the state is in the object itself
// so, these are just functions.
export function htmlUIRenderer(ui, name) {
    const el = document.createElement("div");

    const nameInput = document.createElement("input");
    nameInput.value = name;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&times;";
    delBtn.addEventListener("click", () => {
        for (let i = 0; i < main.staticObjs.length; i++) {
            const other = main.staticObjs[i];
            if (ui == other) {
                main.staticObjs.splice(i, 1);
                break;
            }
        }

        el.remove();
    });

    el.append(nameInput, delBtn);
    return el;
}

export function htmlSlopeUI(ui, name) {
    console.log('yeah?')
    const el = htmlUIRenderer(ui, name);
    const slopeBtn = document.createElement("button");
    slopeBtn.textContent = "rotate";
    slopeBtn.addEventListener("click", () => {
        ui.obj.force.rotate(PI / 2);
    })
    el.append(slopeBtn);
    return el;
}
const countryMenu = document.getElementById("country-select");

let cName = countryMenu.value;


class CountryApp {

    constructor() {

        fetch("https://restcountries.eu/rest/v2/all")
            .then(res => res.json())
            .then(data => this.init(data))
            .catch(err => alert(err));

    }

    init = data => {

        data.forEach((name, index) => {
            countryMenu.innerHTML += `<option value=${index}>${name.name}</option>`;
        });
        this.info = data;
        this.flagArea = document.getElementById("flag-area");
        this.countryInfo = document.querySelector(".country-info");

    }

    currentCountry = e => {

        try {
            const changeName = e.target.value;
            if (changeName !== cName && changeName !== "Select") {
                this.changeFlag(changeName);
                this.changeInfo(changeName);
            } else if (changeName === "Select") {
                this.flagArea.innerHTML = "";
                this.countryInfo.innerHTML = "";
            }
            cName = changeName;
        } catch (e) {
            console.log(e);
        }

    }

    changeFlag = code => {

        this.flagArea.innerHTML = "";
        const img = document.createElement("img");
        img.src = `${this.info[code].flag}`;
        img.alt = `${this.info[code].alpha3Code}`;
        img.width = 280;
        this.flagArea.appendChild(img);

    }

    changeInfo = code => {

        const info = this.info[code];

        const name = info.name;
        const population = info.population;
        const currName = info.currencies[0].name;
        const currSym = info.currencies[0].symbol;
        let timezones = "";
        let callCode = "";
        const domain = info.topLevelDomain;

        info.callingCodes.forEach(e => callCode += e+" ");
        info.timezones.forEach(e => timezones += e+" ");

        const countryContent = `
        <div class="name">
        <div class="info-text">Name Of The Country:</div>
        <div class="result-text">${name}</div>
    </div>
    <div class="population">
        <div class="info-text">Population:</div>
        <div class="result-text">${population}</div>
    </div>
    <div class="currency">
        <div class="info-text">Currency:</div>
        <div class="result-text">${currName}</div>
    </div>
    <div class="currency-symbol">
        <div class="info-text">Currency Symbol:</div>
        <div class="result-text">${currSym}</div>
    </div>
    <div class="timezone">
        <div class="info-text">Timezone:</div>
        <div class="result-text">${timezones}</div>
    </div>
    <div class="calling-code">
        <div class="info-text">Calling Code:</div>
        <div class="result-text">${callCode}</div>
    </div>
    <div class="domain">
        <div class="info-text">Top Level Domain:</div>
        <div class="result-text">${domain}</div>
    </div>
        `;

        this.countryInfo.innerHTML = countryContent;
    }
}

const app = new CountryApp();
countryMenu.addEventListener("click", e => app.currentCountry(e));
countryMenu.addEventListener("touchleave", e => app.currentCountry(e));
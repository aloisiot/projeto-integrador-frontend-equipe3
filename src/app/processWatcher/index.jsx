class ProcessWatcher {
    #observers = []
    #loadingProcesses = []
    #loading = false

    #notifyObservers() {
        this.#observers.forEach(observer => observer(this.#loading))
        console.log(this.#loading)
    }

    subscribe = (observer) => {
        if(typeof observer !== 'function') {
            console.error(
                "Um observeador deve ser uma função que recebe um boleano como parâmetro" +
                "e sera executada sempre que o valor de 'loading mudar'"
            )
            return;
        }
        this.#observers = [...this.#observers, observer] 
    }

    #invalidProcessName = (newProcess) => {
        if(typeof newProcess !== 'string'){
            console.error("O parâmetro 'process' deve ser uma string que identifique o processo")
            return true
        }
        return false
    }

    addLoadingProcess = (newProcess) => {        
        console.log("addLoadingProcess", newProcess)
        if(this.#invalidProcessName(newProcess) || this.#loadingProcesses.includes(newProcess)) return;
        this.#loadingProcesses = [...this.#loadingProcesses, newProcess]
        this.#loading = this.#loadingProcesses.length > 0
        this.#notifyObservers()
    }

    removeLoadingProcess = (process) => {
        console.log("removeLoadingProcess", process)
        if(this.#invalidProcessName(process)) return;
        this.#loadingProcesses = this.#loadingProcesses.filter(current => current !== process)
        this.#loading = this.#loadingProcesses.length > 0
        this.#notifyObservers()
    }
}

export const processWatcher = new ProcessWatcher()

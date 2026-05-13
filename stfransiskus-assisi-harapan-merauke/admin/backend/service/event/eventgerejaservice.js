const Events = require('../../model/katekese/pengumuman/pengumuman')

class eventgerejaservice{ 
    constructor(){ 
        this.events = []
        this.currentId = []
    }


    createEvent({ title, hari, tanggal, waktu, lokasi, pemimpin_ibadat, misdinar, bacaanI, bacaanII, dirigen, organis }) { 
        if (!title || !hari || !tanggal || !waktu || !lokasi || !person || !pemimpin_ibadat || !misdinar || !bacaanI || !bacaanII || !dirigen || !organis) { 
            throw new Error("data pengumman tidak boleh kosong")
        }

        const inputEvent = new Events(this.currentId++, title, hari, tanggal, waktu, lokasi, pemimpin_ibadat, misdinar, bacaanI, bacaanII, dirigen, organis)
        this.events.push(inputEvent)
        return event
    }

    getAllEvent() { 
        return this.events
    }

    getAllEventById(id) { 
        const eventById = this.events.find(e => e.id === parseInt(id))

        if (!eventById) { 
            throw new Error("pengumuman tidak di temukan");
            
        }

        return eventById
    }

    updateEvent(id, { title, hari, tanggal, waktu, lokasi, pemimpin_ibadat, misdinar, bacaanI, bacaanII, dirigen, organis }) {
        const eventIndex = this.events.findIndex(e => e.id === parseInt(id))

        if (eventIndex === -1) { 
            throw new Error("tidak di temukan");
        }

        if (!title || !hari || !tanggal || !waktu || !lokasi || !pemimpin_ibadat || !misdinar || !bacaanI || !bacaanII || !dirigen || !organis) {
            throw new Error("form tidak boleh kosong");
            
        }

        this.events[eventIndex] = new Event(parseInt(id), title, hari, tanggal, waktu, lokasi, pemimpin_ibadat, misdinar, bacaanI, bacaanII, dirigen, organis)
        return this.events[eventIndex]
    }
    
    deleteEvent(id) { 
        const eventIndex = this.events.findIndex(e => e.id === parseInt(id))

        if (eventIndex === -1) { 
            throw new Error("tidak di temukan");
        }

        this.events.splice(eventIndex, 1)
    }
}

module.exports = new eventgerejaservice()
<template>
    <div class="modal-background">
        <div class="modal">
            <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
            <ModalHeader 
                :image="vehicle.images.big_icon"
                :vehicleName="vehicle.name"
                :vehicleTier="vehicle.tier"
                :Nation="vehicle.nation"
                :Type="vehicle.type"
                :Crew="vehicle.crew"
            />
            <div class="modal-body">
                <VehicleModules 
                    v-if="showModules && !mobileWidth"
                    :modules="vehicleModules"
                    @selected-engineid="updateSelectedEngineID"
                    @selected-gunid="updateSelectedGunID"
                    @selected-radioid="updateSelectedRadioID"
                    @selected-suspensionid="updateSelectedSuspensionID"
                    @selected-selected-turretid="updateSelectedTurretID"
                    @get-tank-characteristics="getTankCharacteristics"
                />
                <VehicleDetails 
                    v-if="showCharacteristics"
                    :Characteristics="vehicleCharacteristics"
                />
                <CrewSkills
                    :crew="vehicle.crew"
                    :crewNation="vehicle.nation"
                />
            </div>
            <div class="modal-footer" v-if="showTechTree">
                <div class="tech-tree-row">
                    <TechTreeItem 
                        v-if="showPreviousTechTree"
                        :tankName="previousVehicleData.tank_name"
                        :image="previousVehicleData.big_icon"
                        :priceCredits="previousVehicleData.price_credits"
                        :reserachExp="previousVehicleData.research_experience"
                        @click="getTankInfoTechTree(previousVehicleData.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showCurrentTechTree"
                        :tankName="vehicle.name"
                        :image="vehicle.images.big_icon"
                        :priceCredits="vehicle.price_credit == null ? 0 : vehicle.price_credit"
                        :reserachExp="vehicle.prices_xp == null ? 0 : Object.values(vehicle.prices_xp)[0]"
                        @click="getTankInfoTechTree(vehicle.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showNextTechTree"
                        :tankName="nextVehicleData.tank_name"
                        :image="nextVehicleData.big_icon"
                        :priceCredits="nextVehicleData.price_credits"
                        :reserachExp="nextVehicleData.research_experience"
                        @click="getTankInfoTechTree(nextVehicleData.tank_id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vehicle from '../../../WGClass/Tankopedia/Vehicle'
import VehicleDetails from './VehicleDetails/Details'
import VehicleModules from './VehicleModules/Modules' 

import ModalHeader from './VehicleModalComponents/ModalHeader'
import CrewSkills from './VehicleModalComponents/Crew'
import TechTreeItem from './TechTree/TechTreeItem'

import ModalHelper from '../../../WGClass/VehicleModalHelper/ModalHelper'
import { mapGetters } from 'vuex'
export default {
    name: 'Vehicle Modal',
    components:{
        VehicleDetails,
        VehicleModules,
        TechTreeItem,
        ModalHeader,
        CrewSkills,
    },
    props:{
        vehicleId: Number,
        allVehicles: Object,
    },
    computed: {
        ...mapGetters({
            mobileWidth: 'getMobileWidth',
        }),
        vehicle:{
            get(){
                return this.allVehicles[this.selectedVehicleId]
            },
            set(tankId){
                this.selectedVehicleId = tankId
            }
        },
    },
    data() {
        return {
            selectedVehicleId: this.vehicleId,
            allVehicle : {},
            nextVehicleData: {
                tank_id: 0,
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
            previousVehicleData: {
                tank_id: 0,
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
            showTechTree: true,
            showPreviousTechTree: false,
            showCurrentTechTree: false,
            showNextTechTree: false,
            vehicleCharacteristics: {},
            vehicleModules: {
                engine:[],
                gun:[],
                radio: [],
                suspension: [],
                turret: [],
            },
            selectedVehicleModulesId: {
                engine_id: 0,
                gun_id: 0,
                radio_id: 0,
                suspension_id: 0,
                turret_id: 0
            },
            showCharacteristics: false,
            showModules: false,
        }
    },
    created(){
        if (!this.mobileWidth) {
            this.getVehicleModules()
        }
        this.fillSelectedModulesId()            
        this.getNextVehicle()
        this.getTankCharacteristicsFirsTime()
    },
    methods:{
        updateSelectedEngineID(engine_id){
            this.selectedVehicleModulesId.engine_id = engine_id
        },
        updateSelectedGunID(gun_id){
            this.selectedVehicleModulesId.gun_id = gun_id
        },
        updateSelectedRadioID(radio_id){
            this.selectedVehicleModulesId.radio_id = radio_id
        },
        updateSelectedSuspensionID(suspension_id){
            this.selectedVehicleModulesId.suspension_id = suspension_id
        },
        updateSelectedTurretID(turret_id){
            this.selectedVehicleModulesId.turret_id = turret_id
        },
        // Ezek az alap (STOCK) modulok
        fillSelectedModulesId(){
            this.selectedVehicleModulesId.engine_id = this.vehicle.default_profile.modules.engine_id
            this.selectedVehicleModulesId.radio_id = this.vehicle.default_profile.modules.radio_id
            this.selectedVehicleModulesId.gun_id = this.vehicle.default_profile.modules.gun_id
            this.selectedVehicleModulesId.suspension_id = this.vehicle.default_profile.modules.suspension_id
            // Megoldva: ha pl nincs turret akkor null lesz a turret_id és így nem tudja lekérni a vehicle characteristics-et
            this.selectedVehicleModulesId.turret_id = this.vehicle.default_profile.modules.turret_id == null ? '' : this.vehicle.default_profile.modules.turret_id
        },
        async getTankCharacteristicsFirsTime(){
            const characteristics = await this.returnVehicleCharacteristics().then(characteristic => {
                return characteristic.data
            })
            if(characteristics.status != 'error'){
                this.vehicleCharacteristics = characteristics.data[this.vehicle.tank_id]
                this.showCharacteristics = true
            }
        },
        async getTankCharacteristics(module_id = '', module_type = '', vehicleModuleCategory = ''){
            const characteristics = await this.returnVehicleCharacteristics().then(characteristic => {
                return characteristic.data
            })
            if(characteristics.status != 'error'){
                this.vehicleCharacteristics = characteristics.data[this.vehicle.tank_id]
                this.showCharacteristics = true
            }else{
                // El kéne dönteni, mielőtt kiszámolod, hogy több fajta modul van-e, mert ha igen akkor az előzőt is bele kell adni
                // Ötlet, addig kéne az első láncot Disabled-re tenni, amíg a súly engedi
                const moduleUserClicked = ModalHelper.returnVehicleModulesByModuleID(module_id, this.vehicleModules)

                const foundModuleByID = this.vehicleModules[vehicleModuleCategory][ModalHelper.returnVehicleModulesByFirstModuleFind(this.vehicleModules[vehicleModuleCategory], vehicleModuleCategory)]

                const charasteristicsModuleType = this.vehicleCharacteristics[ModalHelper.getModuleTypeName(module_type)]
                const weight = (this.vehicleCharacteristics.weight - charasteristicsModuleType.weight)

                let withPreviousModuleWeight = weight + moduleUserClicked.weight + foundModuleByID.weight

                if (ModalHelper.isDifferentModules(this.vehicleModules, vehicleModuleCategory, module_id)) {
                    // Megvan, hogy különböző modulok vannak ezen az ágon, külön kell a súlyt kiszámolni az előző modullal együtt
                    // Ehhez még hozzá kéne adni azt a modult amire kattintottam...

                    if(withPreviousModuleWeight > this.vehicleCharacteristics.suspension.load_limit){
                        // console.log('különböző, nem fér a limitbe')
                        // Itt több a súly a terhelési limittel, fel kell tenn mind2 modult
                        this.setEnhancedSuspension()
                        this.selectedVehicleModulesId[`${ModalHelper.getModuleTypeName(moduleUserClicked.type)}_id`] = moduleUserClicked.module_id
                        this.setFirstFoundModuleID(foundModuleByID)

                        this.returnVehicleCharacteristics().then(withSuspension => {
                            if(withSuspension.data.status != 'error'){
                                this.vehicleCharacteristics = withSuspension.data.data[this.vehicleId]
                            }
                        })
                    }else{
                        // Belefér a terhelési limitbe
                        // console.log('különböző, belefér a limitbe')
                        this.selectedVehicleModulesId[`${ModalHelper.getModuleTypeName(moduleUserClicked.type)}_id`] = moduleUserClicked.module_id
                        this.setFirstFoundModuleID(foundModuleByID)

                        this.returnVehicleCharacteristics().then(withSuspension => {
                            if(withSuspension.data.status != 'error'){
                                this.vehicleCharacteristics = withSuspension.data.data[this.vehicleId]
                            }
                        })
                    }
                }else{
                    // Egyforma modulok vannak:
                    if (withPreviousModuleWeight > this.vehicleCharacteristics.suspension.load_limit) {
                        // console.log('egyforma modulok, nem fér bele a limitbe')
                        this.setEnhancedSuspension()
                        this.setFirstFoundModuleID(foundModuleByID)
                        this.returnVehicleCharacteristics().then(withSuspension => {
                            if(withSuspension.data.status != 'error'){
                                this.vehicleCharacteristics = withSuspension.data.data[this.vehicleId]
                            }
                        })
                    }else{
                        // console.log('egyforma, belefér a limitbe')
                        // console.log(ModalHelper.getModuleTypeName(foundModuleByID.type))
                        this.setFirstFoundModuleID(foundModuleByID)
                        this.returnVehicleCharacteristics().then(withSuspension => {
                            if(withSuspension.data.status != 'error'){
                                this.vehicleCharacteristics = withSuspension.data.data[this.vehicleId]
                            }
                        })
                    }
                }
                // ide akkor lépünk be ha error van és a megelőző modult kell kiválasztani
                // 2 eset lehet: 
                // 1. Ki kéne számolni, hogy az adott modult elbírja-e a lánc, ha nem fel kell rakni 
                    // Hibák: 
                    // 1. Ezt visszafele is meg kell csinálni, ha aktív a lánc és visszateszem a default-ot
                    // 2. a check icon csak akkor legyen aktív, ha valóban megtörtént a váltás
                // }
            }
        },
        setFirstFoundModuleID(foundModuleByID){
            this.selectedVehicleModulesId[`${ModalHelper.getModuleTypeName(foundModuleByID.type)}_id`] = foundModuleByID.module_id
        },
        setEnhancedSuspension(){
            this.selectedVehicleModulesId.suspension_id = this.vehicleModules.suspension[1].module_id
        },
        async returnVehicleCharacteristics(){
            return await Vehicle.getVehicleCharacteristics(this.vehicle.tank_id, this.selectedVehicleModulesId)
        },
        async getVehicleModules(setArrayDefault = false){
            if(setArrayDefault){
                this.setModuleArrayToDefault()
            }
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.modules_tree))
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.engine, result.data.data, this.vehicle.default_profile.modules.engine_id)
                this.fillVehicleModules(this.vehicleModules.gun, result.data.data, this.vehicle.default_profile.modules.gun_id) 
                this.fillVehicleModules(this.vehicleModules.radio, result.data.data, this.vehicle.default_profile.modules.radio_id)
                this.fillVehicleModules(this.vehicleModules.suspension, result.data.data, this.vehicle.default_profile.modules.suspension_id)
                if(this.vehicle.turrets.length > 0){ 
                    this.fillVehicleModules(this.vehicleModules.turret, result.data.data, this.vehicle.default_profile.modules.turret_id)
                }
            })
            this.showModules = true
        },
        async getNextVehicle(){
            let nextTankId = '';
            let previousTankId = ''
            // Ha nincs utána tank, tehát pl T9-es
            if (this.vehicle.next_tanks === null) {
                if(this.vehicle.prices_xp !== null){
                    // ha nincs utána de van előtte T9
                    previousTankId = this.getObjectKeysInInteger(this.vehicle.prices_xp)
                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        let prevTankResearchExp = result.data.data[previousTankId].prices_xp === null ? 0 : Object.values(result.data.data[previousTankId].prices_xp)[0]
                        this.fillTechTreeObjects(this.previousVehicleData, result, previousTankId, prevTankResearchExp)

                        this.showCurrentTechTree = true
                        this.showPreviousTechTree = true
                        this.showTechTree = true
                    })
                }else{
                    // Ha nincs se előtte, se utána, nem jelenítem meg a tech tree-t
                    this.showTechTree = false
                    console.log()
                }
            }else{
                // Ha van kövi tank
                if (this.vehicle.prices_xp !== null) {
                    // console.log('Ha van kövi tank és van előző')
                    nextTankId = this.getObjectKeysInInteger(this.vehicle.next_tanks)
                    let nextTankResearchXp = this.getObjectKeysInInteger(this.vehicle.next_tanks, false)

                    previousTankId = this.getObjectKeysInInteger(this.vehicle.prices_xp)

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result => {
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)

                        let prevTankResearchExp = result.data.data[previousTankId].prices_xp === null ? 0 : this.getObjectKeysInInteger(result.data.data[previousTankId].prices_xp, false)
                        this.fillTechTreeObjects(this.previousVehicleData, result, previousTankId, prevTankResearchExp)

                        this.showPreviousTechTree = true
                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                        this.showTechTree = true
                    })
                }else{
                    let nextTankResearchXp = this.getObjectKeysInInteger(this.vehicle.next_tanks, false)
                    nextTankId = this.getObjectKeysInInteger(this.vehicle.next_tanks)

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)

                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                        this.showTechTree = true
                    })
                }
            }

        },
        getTankInfoTechTree(tankID){
            this.vehicle = tankID
            // if (this.vehicle === undefined) {
            this.fillSelectedModulesId()
            this.getVehicleModules(true)
            this.getNextVehicle()
            this.getTankCharacteristics()
        },
        makeModuleStringToSend(module_ids = {}){
            let resultString = '';
            for (const key in module_ids) {
               resultString += key + ','
            }
            return resultString
        },
        fillVehicleModules(moduleTypeArray, resultData, defaultModuleId){
            // push-olom az első modult a vehicleModules.module-ba.
            moduleTypeArray.push(resultData[defaultModuleId])
            let currentVehicleModule = this.vehicle.modules_tree[resultData[defaultModuleId].module_id];
            // Ha a jelenlegi járműnek a lekért modul_id-nek a next module-ja nem null, tehát ha van következő modul...
            if(currentVehicleModule.next_modules != null){
                let nextModuleId = currentVehicleModule.next_modules
                // Amíg van k9vetkező modul, push-olom sorrendbe a vehicleModules-ba
                // Hiba: van olyan eset amikor egy ágon belül 2 választási lehetőség van (2 elem van a next modules-ban) 
                if (nextModuleId.length == 1) {
                    while(nextModuleId[0] != null){
                        moduleTypeArray.push(resultData[nextModuleId[0]])      
                        if (this.vehicle.modules_tree[nextModuleId[0]] != undefined && this.vehicle.modules_tree[nextModuleId[0]].next_modules != null){                
                            nextModuleId[0] = this.vehicle.modules_tree[nextModuleId[0]].next_modules[0]
                        }else{
                            nextModuleId[0] = null
                        }
                    }      
                }else{
                    console.log('halló')
                    for (const item of nextModuleId) {
                        let helper = true
                        let tempModuleId = item;
                        while(helper){
                            moduleTypeArray.push(resultData[tempModuleId])
                            if (this.vehicle.modules_tree[tempModuleId] !== undefined && this.vehicle.modules_tree[tempModuleId].next_modules !== null) {
                                if (this.vehicle.modules_tree[tempModuleId].next_modules.length > 1) {
                                    for (const subItem of this.vehicle.modules_tree[tempModuleId].next_modules) {
                                        let help = true
                                        let tempID = subItem
                                        while (help) {
                                            moduleTypeArray.push(resultData[tempID])
                                            if (this.vehicle.modules_tree[tempID] !== undefined && this.vehicle.modules_tree[tempID].next_modules !== null) {
                                                tempID = this.vehicle.modules_tree[tempID].next_modules[0]
                                            }else{
                                                help = false
                                            }
                                        }
                                    }
                                    helper = false
                                }else{
                                    console.log('csak 1 van')
                                    tempModuleId = this.vehicle.modules_tree[tempModuleId].next_modules[0]
                                }
                            }else{
                                helper = false
                            }
                        }
                    }
                }
            }
        },
        fillTechTreeObjects(vehicleData, resultData, tankID, ResearchXp = 0){
            let tankResult = resultData.data.data[tankID]
            vehicleData.tank_id = tankID
            vehicleData.tank_name = tankResult.name
            vehicleData.big_icon = tankResult.images.big_icon
            vehicleData.price_credits = tankResult.price_credit
            vehicleData.research_experience = ResearchXp
        },
        getObjectKeysInInteger(vehicleId, keys = true){
            return parseInt(keys ? Object.keys(vehicleId)[0] : Object.values(vehicleId)[0])           
        },
        setModuleArrayToDefault(){
            this.vehicleModules.engine = []
            this.vehicleModules.gun = []
            this.vehicleModules.radio = []
            this.vehicleModules.suspension = []
            this.vehicleModules.turret = []
        }
    },
        
}
</script>
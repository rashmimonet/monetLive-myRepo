import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/services/api.service';
import * as countryData from '../../../../assets/countryData.json';
import {UtilityService} from "../../shared/services/utility.service";
// import { debug } from 'console';

// const NAME_REGEX = /[a-zA-Z]{3,}$/;
const NAME_REGEX = /^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/;
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  addCardForm!: FormGroup;
  cardIcon = [
    {name: 'Visa'},
    {name: 'MasterCard'},
    {name: 'American Express'},
    {name: 'Discover'},
    {name: 'Diners Club'},
  ];
  country: any;
  user: any;
  invalidExpiry: boolean = false;
  countryData=[
    { "country_id": 1, "country_name": "World Wide", "states": [] },
    {
      "country_id": 2,
      "country_name": "United states",
      "states": [
        { "country_id": 2, "state_name": "Alabama" },
        { "country_id": 2, "state_name": "Alaska" },
        { "country_id": 2, "state_name": "Arizona" },
        { "country_id": 2, "state_name": "Arkansas" },
        { "country_id": 2, "state_name": "Byram" },
        { "country_id": 2, "state_name": "California" },
        { "country_id": 2, "state_name": "Cokato" },
        { "country_id": 2, "state_name": "Colorado" },
        { "country_id": 2, "state_name": "Connecticut" },
        { "country_id": 2, "state_name": "Delaware" },
        { "country_id": 2, "state_name": "District of Columbia" },
        { "country_id": 2, "state_name": "Florida" },
        { "country_id": 2, "state_name": "Georgia" },
        { "country_id": 2, "state_name": "Hawaii" },
        { "country_id": 2, "state_name": "Idaho" },
        { "country_id": 2, "state_name": "Illinois" },
        { "country_id": 2, "state_name": "Indiana" },
        { "country_id": 2, "state_name": "Iowa" },
        { "country_id": 2, "state_name": "Kansas" },
        { "country_id": 2, "state_name": "Kentucky" },
        { "country_id": 2, "state_name": "Louisiana" },
        { "country_id": 2, "state_name": "Lowa" },
        { "country_id": 2, "state_name": "Maine" },
        { "country_id": 2, "state_name": "Maryland" },
        { "country_id": 2, "state_name": "Massachusetts" },
        { "country_id": 2, "state_name": "Medfield" },
        { "country_id": 2, "state_name": "Michigan" },
        { "country_id": 2, "state_name": "Minnesota" },
        { "country_id": 2, "state_name": "Mississippi" },
        { "country_id": 2, "state_name": "Missouri" },
        { "country_id": 2, "state_name": "Montana" },
        { "country_id": 2, "state_name": "Nebraska" },
        { "country_id": 2, "state_name": "Nevada" },
        { "country_id": 2, "state_name": "New Hampshire" },
        { "country_id": 2, "state_name": "New Jersey" },
        { "country_id": 2, "state_name": "New Jersy" },
        { "country_id": 2, "state_name": "New Mexico" },
        { "country_id": 2, "state_name": "New York" },
        { "country_id": 2, "state_name": "North Carolina" },
        { "country_id": 2, "state_name": "North Dakota" },
        { "country_id": 2, "state_name": "Ohio" },
        { "country_id": 2, "state_name": "Oklahoma" },
        { "country_id": 2, "state_name": "Ontario" },
        { "country_id": 2, "state_name": "Oregon" },
        { "country_id": 2, "state_name": "Pennsylvania" },
        { "country_id": 2, "state_name": "Ramey" },
        { "country_id": 2, "state_name": "Rhode Island" },
        { "country_id": 2, "state_name": "South Carolina" },
        { "country_id": 2, "state_name": "South Dakota" },
        { "country_id": 2, "state_name": "Sublimity" },
        { "country_id": 2, "state_name": "Tennessee" },
        { "country_id": 2, "state_name": "Texas" },
        { "country_id": 2, "state_name": "Trimble" },
        { "country_id": 2, "state_name": "Utah" },
        { "country_id": 2, "state_name": "Vermont" },
        { "country_id": 2, "state_name": "Virginia" },
        { "country_id": 2, "state_name": "Washington" },
        { "country_id": 2, "state_name": "West Virginia" },
        { "country_id": 2, "state_name": "Wisconsin" },
        { "country_id": 2, "state_name": "Wyoming" }
      ]
    },
    {
      "country_id": 3,
      "country_name": "Afghanistan",
      "states": [
        { "country_id": 3, "state_name": "Badakhshan" },
        { "country_id": 3, "state_name": "Badgis" },
        { "country_id": 3, "state_name": "Baglan" },
        { "country_id": 3, "state_name": "Balkh" },
        { "country_id": 3, "state_name": "Bamiyan" },
        { "country_id": 3, "state_name": "Farah" },
        { "country_id": 3, "state_name": "Faryab" },
        { "country_id": 3, "state_name": "Gawr" },
        { "country_id": 3, "state_name": "Gazni" },
        { "country_id": 3, "state_name": "Herat" },
        { "country_id": 3, "state_name": "Hilmand" },
        { "country_id": 3, "state_name": "Jawzjan" },
        { "country_id": 3, "state_name": "Kabul" },
        { "country_id": 3, "state_name": "Kapisa" },
        { "country_id": 3, "state_name": "Khawst" },
        { "country_id": 3, "state_name": "Kunar" },
        { "country_id": 3, "state_name": "Lagman" },
        { "country_id": 3, "state_name": "Lawghar" },
        { "country_id": 3, "state_name": "Nangarhar" },
        { "country_id": 3, "state_name": "Nimruz" },
        { "country_id": 3, "state_name": "Nuristan" },
        { "country_id": 3, "state_name": "Paktika" },
        { "country_id": 3, "state_name": "Paktiya" },
        { "country_id": 3, "state_name": "Parwan" },
        { "country_id": 3, "state_name": "Qandahar" },
        { "country_id": 3, "state_name": "Qunduz" },
        { "country_id": 3, "state_name": "Samangan" },
        { "country_id": 3, "state_name": "Sar-e Pul" },
        { "country_id": 3, "state_name": "Takhar" },
        { "country_id": 3, "state_name": "Uruzgan" },
        { "country_id": 3, "state_name": "Wardag" },
        { "country_id": 3, "state_name": "Zabul" }
      ]
    },
    {
      "country_id": 4,
      "country_name": "Albania",
      "states": [
        { "country_id": 4, "state_name": "Berat" },
        { "country_id": 4, "state_name": "Bulqize" },
        { "country_id": 4, "state_name": "Delvine" },
        { "country_id": 4, "state_name": "Devoll" },
        { "country_id": 4, "state_name": "Dibre" },
        { "country_id": 4, "state_name": "Durres" },
        { "country_id": 4, "state_name": "Elbasan" },
        { "country_id": 4, "state_name": "Fier" },
        { "country_id": 4, "state_name": "Gjirokaster" },
        { "country_id": 4, "state_name": "Gramsh" },
        { "country_id": 4, "state_name": "Has" },
        { "country_id": 4, "state_name": "Kavaje" },
        { "country_id": 4, "state_name": "Kolonje" },
        { "country_id": 4, "state_name": "Korce" },
        { "country_id": 4, "state_name": "Kruje" },
        { "country_id": 4, "state_name": "Kucove" },
        { "country_id": 4, "state_name": "Kukes" },
        { "country_id": 4, "state_name": "Kurbin" },
        { "country_id": 4, "state_name": "Lezhe" },
        { "country_id": 4, "state_name": "Librazhd" },
        { "country_id": 4, "state_name": "Lushnje" },
        { "country_id": 4, "state_name": "Mallakaster" },
        { "country_id": 4, "state_name": "Malsi e Madhe" },
        { "country_id": 4, "state_name": "Mat" },
        { "country_id": 4, "state_name": "Mirdite" },
        { "country_id": 4, "state_name": "Peqin" },
        { "country_id": 4, "state_name": "Permet" },
        { "country_id": 4, "state_name": "Pogradec" },
        { "country_id": 4, "state_name": "Puke" },
        { "country_id": 4, "state_name": "Sarande" },
        { "country_id": 4, "state_name": "Shkoder" },
        { "country_id": 4, "state_name": "Skrapar" },
        { "country_id": 4, "state_name": "Tepelene" },
        { "country_id": 4, "state_name": "Tirane" },
        { "country_id": 4, "state_name": "Tropoje" },
        { "country_id": 4, "state_name": "Vlore" }
      ]
    },
    {
      "country_id": 5,
      "country_name": "Algeria",
      "states": [
        { "country_id": 5, "state_name": "Ayn Daflah" },
        { "country_id": 5, "state_name": "Ayn Tamushanat" },
        { "country_id": 5, "state_name": "Adrar" },
        { "country_id": 5, "state_name": "Algiers" },
        { "country_id": 5, "state_name": "Annabah" },
        { "country_id": 5, "state_name": "Bashshar" },
        { "country_id": 5, "state_name": "Batnah" },
        { "country_id": 5, "state_name": "Bijayah" },
        { "country_id": 5, "state_name": "Biskrah" },
        { "country_id": 5, "state_name": "Blidah" },
        { "country_id": 5, "state_name": "Buirah" },
        { "country_id": 5, "state_name": "Bumardas" },
        { "country_id": 5, "state_name": "Burj Bu Arririj" },
        { "country_id": 5, "state_name": "Ghalizan" },
        { "country_id": 5, "state_name": "Ghardayah" },
        { "country_id": 5, "state_name": "Ilizi" },
        { "country_id": 5, "state_name": "Jijili" },
        { "country_id": 5, "state_name": "Jilfah" },
        { "country_id": 5, "state_name": "Khanshalah" },
        { "country_id": 5, "state_name": "Masilah" },
        { "country_id": 5, "state_name": "Midyah" },
        { "country_id": 5, "state_name": "Milah" },
        { "country_id": 5, "state_name": "Muaskar" },
        { "country_id": 5, "state_name": "Mustaghanam" },
        { "country_id": 5, "state_name": "Naama" },
        { "country_id": 5, "state_name": "Oran" },
        { "country_id": 5, "state_name": "Ouargla" },
        { "country_id": 5, "state_name": "Qalmah" },
        { "country_id": 5, "state_name": "Qustantinah" },
        { "country_id": 5, "state_name": "Sakikdah" },
        { "country_id": 5, "state_name": "Satif" },
        { "country_id": 5, "state_name": "Sayda" },
        { "country_id": 5, "state_name": "Sidi ban-al-'Abbas'" },
        { "country_id": 5, "state_name": "Suq Ahras" },
        { "country_id": 5, "state_name": "Tamanghasat" },
        { "country_id": 5, "state_name": "Tibazah" },
        { "country_id": 5, "state_name": "Tibissah" },
        { "country_id": 5, "state_name": "Tilimsan" },
        { "country_id": 5, "state_name": "Tinduf" },
        { "country_id": 5, "state_name": "Tisamsilt" },
        { "country_id": 5, "state_name": "Tiyarat" },
        { "country_id": 5, "state_name": "Tizi Wazu" },
        { "country_id": 5, "state_name": "Umm-al-Bawaghi" },
        { "country_id": 5, "state_name": "Wahran" },
        { "country_id": 5, "state_name": "Warqla" },
        { "country_id": 5, "state_name": "Wilaya d Alger" },
        { "country_id": 5, "state_name": "Wilaya de Bejaia" },
        { "country_id": 5, "state_name": "Wilaya de Constantine" },
        { "country_id": 5, "state_name": "al-Aghwat" },
        { "country_id": 5, "state_name": "al-Bayadh" },
        { "country_id": 5, "state_name": "al-Jaza'ir" },
        { "country_id": 5, "state_name": "al-Wad" },
        { "country_id": 5, "state_name": "ash-Shalif" },
        { "country_id": 5, "state_name": "at-Tarif" }
      ]
    },
    {
      "country_id": 6,
      "country_name": "American Samoa",
      "states": [
        { "country_id": 6, "state_name": "Eastern" },
        { "country_id": 6, "state_name": "Manu'a" },
        { "country_id": 6, "state_name": "Swains Island" },
        { "country_id": 6, "state_name": "Western" }
      ]
    },
    {
      "country_id": 7,
      "country_name": "Andorra",
      "states": [
        { "country_id": 7, "state_name": "Andorra la Vella" },
        { "country_id": 7, "state_name": "Canillo" },
        { "country_id": 7, "state_name": "Encamp" },
        { "country_id": 7, "state_name": "La Massana" },
        { "country_id": 7, "state_name": "Les Escaldes" },
        { "country_id": 7, "state_name": "Ordino" },
        { "country_id": 7, "state_name": "Sant Julia de Loria" }
      ]
    },
    {
      "country_id": 8,
      "country_name": "Angola",
      "states": [
        { "country_id": 8, "state_name": "Bengo" },
        { "country_id": 8, "state_name": "Benguela" },
        { "country_id": 8, "state_name": "Bie" },
        { "country_id": 8, "state_name": "Cabinda" },
        { "country_id": 8, "state_name": "Cunene" },
        { "country_id": 8, "state_name": "Huambo" },
        { "country_id": 8, "state_name": "Huila" },
        { "country_id": 8, "state_name": "Kuando-Kubango" },
        { "country_id": 8, "state_name": "Kwanza Norte" },
        { "country_id": 8, "state_name": "Kwanza Sul" },
        { "country_id": 8, "state_name": "Luanda" },
        { "country_id": 8, "state_name": "Lunda Norte" },
        { "country_id": 8, "state_name": "Lunda Sul" },
        { "country_id": 8, "state_name": "Malanje" },
        { "country_id": 8, "state_name": "Moxico" },
        { "country_id": 8, "state_name": "Namibe" },
        { "country_id": 8, "state_name": "Uige" },
        { "country_id": 8, "state_name": "Zaire" }
      ]
    },
    {
      "country_id": 9,
      "country_name": "Anguilla",
      "states": [{ "country_id": 9, "state_name": "Other Provinces" }]
    },
    {
      "country_id": 10,
      "country_name": "Antarctica",
      "states": [
        { "country_id": 10, "state_name": "Sector claimed by Argentina/Ch" },
        { "country_id": 10, "state_name": "Sector claimed by Argentina/UK" },
        { "country_id": 10, "state_name": "Sector claimed by Australia" },
        { "country_id": 10, "state_name": "Sector claimed by France" },
        { "country_id": 10, "state_name": "Sector claimed by New Zealand" },
        { "country_id": 10, "state_name": "Sector claimed by Norway" },
        { "country_id": 10, "state_name": "Unclaimed Sector" }
      ]
    },
    {
      "country_id": 11,
      "country_name": "Antigua And Barbuda",
      "states": [
        { "country_id": 11, "state_name": "Barbuda" },
        { "country_id": 11, "state_name": "Saint George" },
        { "country_id": 11, "state_name": "Saint John" },
        { "country_id": 11, "state_name": "Saint Mary" },
        { "country_id": 11, "state_name": "Saint Paul" },
        { "country_id": 11, "state_name": "Saint Peter" },
        { "country_id": 11, "state_name": "Saint Philip" }
      ]
    },
    {
      "country_id": 12,
      "country_name": "Argentina",
      "states": [
        { "country_id": 12, "state_name": "Buenos Aires" },
        { "country_id": 12, "state_name": "Catamarca" },
        { "country_id": 12, "state_name": "Chaco" },
        { "country_id": 12, "state_name": "Chubut" },
        { "country_id": 12, "state_name": "Cordoba" },
        { "country_id": 12, "state_name": "Corrientes" },
        { "country_id": 12, "state_name": "Distrito Federal" },
        { "country_id": 12, "state_name": "Entre Rios" },
        { "country_id": 12, "state_name": "Formosa" },
        { "country_id": 12, "state_name": "Jujuy" },
        { "country_id": 12, "state_name": "La Pampa" },
        { "country_id": 12, "state_name": "La Rioja" },
        { "country_id": 12, "state_name": "Mendoza" },
        { "country_id": 12, "state_name": "Misiones" },
        { "country_id": 12, "state_name": "Neuquen" },
        { "country_id": 12, "state_name": "Rio Negro" },
        { "country_id": 12, "state_name": "Salta" },
        { "country_id": 12, "state_name": "San Juan" },
        { "country_id": 12, "state_name": "San Luis" },
        { "country_id": 12, "state_name": "Santa Cruz" },
        { "country_id": 12, "state_name": "Santa Fe" },
        { "country_id": 12, "state_name": "Santiago del Estero" },
        { "country_id": 12, "state_name": "Tierra del Fuego" },
        { "country_id": 12, "state_name": "Tucuman" }
      ]
    },
    {
      "country_id": 13,
      "country_name": "Armenia",
      "states": [
        { "country_id": 13, "state_name": "Aragatsotn" },
        { "country_id": 13, "state_name": "Ararat" },
        { "country_id": 13, "state_name": "Armavir" },
        { "country_id": 13, "state_name": "Gegharkunik" },
        { "country_id": 13, "state_name": "Kotaik" },
        { "country_id": 13, "state_name": "Lori" },
        { "country_id": 13, "state_name": "Shirak" },
        { "country_id": 13, "state_name": "Stepanakert" },
        { "country_id": 13, "state_name": "Syunik" },
        { "country_id": 13, "state_name": "Tavush" },
        { "country_id": 13, "state_name": "Vayots Dzor" },
        { "country_id": 13, "state_name": "Yerevan" }
      ]
    },
    {
      "country_id": 14,
      "country_name": "Aruba",
      "states": [{ "country_id": 14, "state_name": "Aruba" }]
    },
    {
      "country_id": 15,
      "country_name": "Australia",
      "states": [
        { "country_id": 15, "state_name": "Auckland" },
        { "country_id": 15, "state_name": "Australian Capital Territory" },
        { "country_id": 15, "state_name": "Balgowlah" },
        { "country_id": 15, "state_name": "Balmain" },
        { "country_id": 15, "state_name": "Bankstown" },
        { "country_id": 15, "state_name": "Baulkham Hills" },
        { "country_id": 15, "state_name": "Bonnet Bay" },
        { "country_id": 15, "state_name": "Camberwell" },
        { "country_id": 15, "state_name": "Carole Park" },
        { "country_id": 15, "state_name": "Castle Hill" },
        { "country_id": 15, "state_name": "Caulfield" },
        { "country_id": 15, "state_name": "Chatswood" },
        { "country_id": 15, "state_name": "Cheltenham" },
        { "country_id": 15, "state_name": "Cherrybrook" },
        { "country_id": 15, "state_name": "Clayton" },
        { "country_id": 15, "state_name": "Collingwood" },
        { "country_id": 15, "state_name": "Frenchs Forest" },
        { "country_id": 15, "state_name": "Hawthorn" },
        { "country_id": 15, "state_name": "Jannnali" },
        { "country_id": 15, "state_name": "Knoxfield" },
        { "country_id": 15, "state_name": "Melbourne" },
        { "country_id": 15, "state_name": "New South Wales" },
        { "country_id": 15, "state_name": "Northern Territory" },
        { "country_id": 15, "state_name": "Perth" },
        { "country_id": 15, "state_name": "Queensland" },
        { "country_id": 15, "state_name": "South Australia" },
        { "country_id": 15, "state_name": "Tasmania" },
        { "country_id": 15, "state_name": "Templestowe" },
        { "country_id": 15, "state_name": "Victoria" },
        { "country_id": 15, "state_name": "Werribee south" },
        { "country_id": 15, "state_name": "Western Australia" },
        { "country_id": 15, "state_name": "Wheeler" }
      ]
    },
    {
      "country_id": 16,
      "country_name": "Austria",
      "states": [
        { "country_id": 16, "state_name": "Bundesland Salzburg" },
        { "country_id": 16, "state_name": "Bundesland Steiermark" },
        { "country_id": 16, "state_name": "Bundesland Tirol" },
        { "country_id": 16, "state_name": "Burgenland" },
        { "country_id": 16, "state_name": "Carinthia" },
        { "country_id": 16, "state_name": "Karnten" },
        { "country_id": 16, "state_name": "Liezen" },
        { "country_id": 16, "state_name": "Lower Austria" },
        { "country_id": 16, "state_name": "Niederosterreich" },
        { "country_id": 16, "state_name": "Oberosterreich" },
        { "country_id": 16, "state_name": "Salzburg" },
        { "country_id": 16, "state_name": "Schleswig-Holstein" },
        { "country_id": 16, "state_name": "Steiermark" },
        { "country_id": 16, "state_name": "Styria" },
        { "country_id": 16, "state_name": "Tirol" },
        { "country_id": 16, "state_name": "Upper Austria" },
        { "country_id": 16, "state_name": "Vorarlberg" },
        { "country_id": 16, "state_name": "Wien" }
      ]
    },
    {
      "country_id": 17,
      "country_name": "Azerbaijan",
      "states": [
        { "country_id": 17, "state_name": "Abseron" },
        { "country_id": 17, "state_name": "Baki Sahari" },
        { "country_id": 17, "state_name": "Ganca" },
        { "country_id": 17, "state_name": "Ganja" },
        { "country_id": 17, "state_name": "Kalbacar" },
        { "country_id": 17, "state_name": "Lankaran" },
        { "country_id": 17, "state_name": "Mil-Qarabax" },
        { "country_id": 17, "state_name": "Mugan-Salyan" },
        { "country_id": 17, "state_name": "Nagorni-Qarabax" },
        { "country_id": 17, "state_name": "Naxcivan" },
        { "country_id": 17, "state_name": "Priaraks" },
        { "country_id": 17, "state_name": "Qazax" },
        { "country_id": 17, "state_name": "Saki" },
        { "country_id": 17, "state_name": "Sirvan" },
        { "country_id": 17, "state_name": "Xacmaz" }
      ]
    },
    {
      "country_id": 18,
      "country_name": "Bahamas The",
      "states": [
        { "country_id": 18, "state_name": "Abaco" },
        { "country_id": 18, "state_name": "Acklins Island" },
        { "country_id": 18, "state_name": "Andros" },
        { "country_id": 18, "state_name": "Berry Islands" },
        { "country_id": 18, "state_name": "Biminis" },
        { "country_id": 18, "state_name": "Cat Island" },
        { "country_id": 18, "state_name": "Crooked Island" },
        { "country_id": 18, "state_name": "Eleuthera" },
        { "country_id": 18, "state_name": "Exuma and Cays" },
        { "country_id": 18, "state_name": "Grand Bahama" },
        { "country_id": 18, "state_name": "Inagua Islands" },
        { "country_id": 18, "state_name": "Long Island" },
        { "country_id": 18, "state_name": "Mayaguana" },
        { "country_id": 18, "state_name": "New Providence" },
        { "country_id": 18, "state_name": "Ragged Island" },
        { "country_id": 18, "state_name": "Rum Cay" },
        { "country_id": 18, "state_name": "San Salvador" }
      ]
    },
    {
      "country_id": 19,
      "country_name": "Bahrain",
      "states": [
        { "country_id": 19, "state_name": "Isa" },
        { "country_id": 19, "state_name": "Badiyah" },
        { "country_id": 19, "state_name": "Hidd" },
        { "country_id": 19, "state_name": "Jidd Hafs" },
        { "country_id": 19, "state_name": "Mahama" },
        { "country_id": 19, "state_name": "Manama" },
        { "country_id": 19, "state_name": "Sitrah" },
        { "country_id": 19, "state_name": "al-Manamah" },
        { "country_id": 19, "state_name": "al-Muharraq" },
        { "country_id": 19, "state_name": "ar-Rifa'a'" }
      ]
    },
    {
      "country_id": 20,
      "country_name": "Bangladesh",
      "states": [
        { "country_id": 20, "state_name": "Bagar Hat" },
        { "country_id": 20, "state_name": "Bandarban" },
        { "country_id": 20, "state_name": "Barguna" },
        { "country_id": 20, "state_name": "Barisal" },
        { "country_id": 20, "state_name": "Bhola" },
        { "country_id": 20, "state_name": "Bogora" },
        { "country_id": 20, "state_name": "Brahman Bariya" },
        { "country_id": 20, "state_name": "Chandpur" },
        { "country_id": 20, "state_name": "Chattagam" },
        { "country_id": 20, "state_name": "Chittagong Division" },
        { "country_id": 20, "state_name": "Chuadanga" },
        { "country_id": 20, "state_name": "Dhaka" },
        { "country_id": 20, "state_name": "Dinajpur" },
        { "country_id": 20, "state_name": "Faridpur" },
        { "country_id": 20, "state_name": "Feni" },
        { "country_id": 20, "state_name": "Gaybanda" },
        { "country_id": 20, "state_name": "Gazipur" },
        { "country_id": 20, "state_name": "Gopalganj" },
        { "country_id": 20, "state_name": "Habiganj" },
        { "country_id": 20, "state_name": "Jaipur Hat" },
        { "country_id": 20, "state_name": "Jamalpur" },
        { "country_id": 20, "state_name": "Jessor" },
        { "country_id": 20, "state_name": "Jhalakati" },
        { "country_id": 20, "state_name": "Jhanaydah" },
        { "country_id": 20, "state_name": "Khagrachhari" },
        { "country_id": 20, "state_name": "Khulna" },
        { "country_id": 20, "state_name": "Kishorganj" },
        { "country_id": 20, "state_name": "Koks Bazar" },
        { "country_id": 20, "state_name": "Komilla" },
        { "country_id": 20, "state_name": "Kurigram" },
        { "country_id": 20, "state_name": "Kushtiya" },
        { "country_id": 20, "state_name": "Lakshmipur" },
        { "country_id": 20, "state_name": "Lalmanir Hat" },
        { "country_id": 20, "state_name": "Madaripur" },
        { "country_id": 20, "state_name": "Magura" },
        { "country_id": 20, "state_name": "Maimansingh" },
        { "country_id": 20, "state_name": "Manikganj" },
        { "country_id": 20, "state_name": "Maulvi Bazar" },
        { "country_id": 20, "state_name": "Meherpur" },
        { "country_id": 20, "state_name": "Munshiganj" },
        { "country_id": 20, "state_name": "Naral" },
        { "country_id": 20, "state_name": "Narayanganj" },
        { "country_id": 20, "state_name": "Narsingdi" },
        { "country_id": 20, "state_name": "Nator" },
        { "country_id": 20, "state_name": "Naugaon" },
        { "country_id": 20, "state_name": "Nawabganj" },
        { "country_id": 20, "state_name": "Netrakona" },
        { "country_id": 20, "state_name": "Nilphamari" },
        { "country_id": 20, "state_name": "Noakhali" },
        { "country_id": 20, "state_name": "Pabna" },
        { "country_id": 20, "state_name": "Panchagarh" },
        { "country_id": 20, "state_name": "Patuakhali" },
        { "country_id": 20, "state_name": "Pirojpur" },
        { "country_id": 20, "state_name": "Rajbari" },
        { "country_id": 20, "state_name": "Rajshahi" },
        { "country_id": 20, "state_name": "Rangamati" },
        { "country_id": 20, "state_name": "Rangpur" },
        { "country_id": 20, "state_name": "Satkhira" },
        { "country_id": 20, "state_name": "Shariatpur" },
        { "country_id": 20, "state_name": "Sherpur" },
        { "country_id": 20, "state_name": "Silhat" },
        { "country_id": 20, "state_name": "Sirajganj" },
        { "country_id": 20, "state_name": "Sunamganj" },
        { "country_id": 20, "state_name": "Tangayal" },
        { "country_id": 20, "state_name": "Thakurgaon" }
      ]
    },
    {
      "country_id": 21,
      "country_name": "Barbados",
      "states": [
        { "country_id": 21, "state_name": "Christ Church" },
        { "country_id": 21, "state_name": "Saint Andrew" },
        { "country_id": 21, "state_name": "Saint George" },
        { "country_id": 21, "state_name": "Saint James" },
        { "country_id": 21, "state_name": "Saint John" },
        { "country_id": 21, "state_name": "Saint Joseph" },
        { "country_id": 21, "state_name": "Saint Lucy" },
        { "country_id": 21, "state_name": "Saint Michael" },
        { "country_id": 21, "state_name": "Saint Peter" },
        { "country_id": 21, "state_name": "Saint Philip" },
        { "country_id": 21, "state_name": "Saint Thomas" }
      ]
    },
    {
      "country_id": 22,
      "country_name": "Belarus",
      "states": [
        { "country_id": 22, "state_name": "Brest" },
        { "country_id": 22, "state_name": "Homjel" },
        { "country_id": 22, "state_name": "Hrodna" },
        { "country_id": 22, "state_name": "Mahiljow" },
        { "country_id": 22, "state_name": "Mahilyowskaya Voblasts" },
        { "country_id": 22, "state_name": "Minsk" },
        { "country_id": 22, "state_name": "Minskaja Voblasts" },
        { "country_id": 22, "state_name": "Petrik" },
        { "country_id": 22, "state_name": "Vicebsk" }
      ]
    },
    {
      "country_id": 23,
      "country_name": "Belgium",
      "states": [
        { "country_id": 23, "state_name": "Antwerpen" },
        { "country_id": 23, "state_name": "Berchem" },
        { "country_id": 23, "state_name": "Brabant" },
        { "country_id": 23, "state_name": "Brabant Wallon" },
        { "country_id": 23, "state_name": "Brussel" },
        { "country_id": 23, "state_name": "East Flanders" },
        { "country_id": 23, "state_name": "Hainaut" },
        { "country_id": 23, "state_name": "Liege" },
        { "country_id": 23, "state_name": "Limburg" },
        { "country_id": 23, "state_name": "Luxembourg" },
        { "country_id": 23, "state_name": "Namur" },
        { "country_id": 23, "state_name": "Ontario" },
        { "country_id": 23, "state_name": "Oost-Vlaanderen" },
        { "country_id": 23, "state_name": "Provincie Brabant" },
        { "country_id": 23, "state_name": "Vlaams-Brabant" },
        { "country_id": 23, "state_name": "Wallonne" },
        { "country_id": 23, "state_name": "West-Vlaanderen" }
      ]
    },
    {
      "country_id": 24,
      "country_name": "Belize",
      "states": [
        { "country_id": 24, "state_name": "Belize" },
        { "country_id": 24, "state_name": "Cayo" },
        { "country_id": 24, "state_name": "Corozal" },
        { "country_id": 24, "state_name": "Orange Walk" },
        { "country_id": 24, "state_name": "Stann Creek" },
        { "country_id": 24, "state_name": "Toledo" }
      ]
    },
    {
      "country_id": 25,
      "country_name": "Benin",
      "states": [
        { "country_id": 25, "state_name": "Alibori" },
        { "country_id": 25, "state_name": "Atacora" },
        { "country_id": 25, "state_name": "Atlantique" },
        { "country_id": 25, "state_name": "Borgou" },
        { "country_id": 25, "state_name": "Collines" },
        { "country_id": 25, "state_name": "Couffo" },
        { "country_id": 25, "state_name": "Donga" },
        { "country_id": 25, "state_name": "Littoral" },
        { "country_id": 25, "state_name": "Mono" },
        { "country_id": 25, "state_name": "Oueme" },
        { "country_id": 25, "state_name": "Plateau" },
        { "country_id": 25, "state_name": "Zou" }
      ]
    },
    {
      "country_id": 26,
      "country_name": "Bermuda",
      "states": [
        { "country_id": 26, "state_name": "Hamilton" },
        { "country_id": 26, "state_name": "Saint George" }
      ]
    },
    {
      "country_id": 27,
      "country_name": "Bhutan",
      "states": [
        { "country_id": 27, "state_name": "Bumthang" },
        { "country_id": 27, "state_name": "Chhukha" },
        { "country_id": 27, "state_name": "Chirang" },
        { "country_id": 27, "state_name": "Daga" },
        { "country_id": 27, "state_name": "Geylegphug" },
        { "country_id": 27, "state_name": "Ha" },
        { "country_id": 27, "state_name": "Lhuntshi" },
        { "country_id": 27, "state_name": "Mongar" },
        { "country_id": 27, "state_name": "Pemagatsel" },
        { "country_id": 27, "state_name": "Punakha" },
        { "country_id": 27, "state_name": "Rinpung" },
        { "country_id": 27, "state_name": "Samchi" },
        { "country_id": 27, "state_name": "Samdrup Jongkhar" },
        { "country_id": 27, "state_name": "Shemgang" },
        { "country_id": 27, "state_name": "Tashigang" },
        { "country_id": 27, "state_name": "Timphu" },
        { "country_id": 27, "state_name": "Tongsa" },
        { "country_id": 27, "state_name": "Wangdiphodrang" }
      ]
    },
    {
      "country_id": 28,
      "country_name": "Bolivia",
      "states": [
        { "country_id": 28, "state_name": "Beni" },
        { "country_id": 28, "state_name": "Chuquisaca" },
        { "country_id": 28, "state_name": "Cochabamba" },
        { "country_id": 28, "state_name": "La Paz" },
        { "country_id": 28, "state_name": "Oruro" },
        { "country_id": 28, "state_name": "Pando" },
        { "country_id": 28, "state_name": "Potosi" },
        { "country_id": 28, "state_name": "Santa Cruz" },
        { "country_id": 28, "state_name": "Tarija" }
      ]
    },
    {
      "country_id": 29,
      "country_name": "Bosnia and Herzegovina",
      "states": [
        { "country_id": 29, "state_name": "Federacija Bosna i Hercegovina" },
        { "country_id": 29, "state_name": "Republika Srpska" }
      ]
    },
    {
      "country_id": 30,
      "country_name": "Botswana",
      "states": [
        { "country_id": 30, "state_name": "Central Bobonong" },
        { "country_id": 30, "state_name": "Central Boteti" },
        { "country_id": 30, "state_name": "Central Mahalapye" },
        { "country_id": 30, "state_name": "Central Serowe-Palapye" },
        { "country_id": 30, "state_name": "Central Tutume" },
        { "country_id": 30, "state_name": "Chobe" },
        { "country_id": 30, "state_name": "Francistown" },
        { "country_id": 30, "state_name": "Gaborone" },
        { "country_id": 30, "state_name": "Ghanzi" },
        { "country_id": 30, "state_name": "Jwaneng" },
        { "country_id": 30, "state_name": "Kgalagadi North" },
        { "country_id": 30, "state_name": "Kgalagadi South" },
        { "country_id": 30, "state_name": "Kgatleng" },
        { "country_id": 30, "state_name": "Kweneng" },
        { "country_id": 30, "state_name": "Lobatse" },
        { "country_id": 30, "state_name": "Ngamiland" },
        { "country_id": 30, "state_name": "Ngwaketse" },
        { "country_id": 30, "state_name": "North East" },
        { "country_id": 30, "state_name": "Okavango" },
        { "country_id": 30, "state_name": "Orapa" },
        { "country_id": 30, "state_name": "Selibe Phikwe" },
        { "country_id": 30, "state_name": "South East" },
        { "country_id": 30, "state_name": "Sowa" }
      ]
    },
    {
      "country_id": 31,
      "country_name": "Bouvet Island",
      "states": [{ "country_id": 31, "state_name": "Bouvet Island" }]
    },
    {
      "country_id": 32,
      "country_name": "Brazil",
      "states": [
        { "country_id": 32, "state_name": "Acre" },
        { "country_id": 32, "state_name": "Alagoas" },
        { "country_id": 32, "state_name": "Amapa" },
        { "country_id": 32, "state_name": "Amazonas" },
        { "country_id": 32, "state_name": "Bahia" },
        { "country_id": 32, "state_name": "Ceara" },
        { "country_id": 32, "state_name": "Distrito Federal" },
        { "country_id": 32, "state_name": "Espirito Santo" },
        { "country_id": 32, "state_name": "Estado de Sao Paulo" },
        { "country_id": 32, "state_name": "Goias" },
        { "country_id": 32, "state_name": "Maranhao" },
        { "country_id": 32, "state_name": "Mato Grosso" },
        { "country_id": 32, "state_name": "Mato Grosso do Sul" },
        { "country_id": 32, "state_name": "Minas Gerais" },
        { "country_id": 32, "state_name": "Para" },
        { "country_id": 32, "state_name": "Paraiba" },
        { "country_id": 32, "state_name": "Parana" },
        { "country_id": 32, "state_name": "Pernambuco" },
        { "country_id": 32, "state_name": "Piaui" },
        { "country_id": 32, "state_name": "Rio Grande do Norte" },
        { "country_id": 32, "state_name": "Rio Grande do Sul" },
        { "country_id": 32, "state_name": "Rio de Janeiro" },
        { "country_id": 32, "state_name": "Rondonia" },
        { "country_id": 32, "state_name": "Roraima" },
        { "country_id": 32, "state_name": "Santa Catarina" },
        { "country_id": 32, "state_name": "Sao Paulo" },
        { "country_id": 32, "state_name": "Sergipe" },
        { "country_id": 32, "state_name": "Tocantins" }
      ]
    },
    {
      "country_id": 33,
      "country_name": "British Indian Ocean Territory",
      "states": [
        { "country_id": 33, "state_name": "British Indian Ocean Territory" }
      ]
    },
    {
      "country_id": 34,
      "country_name": "Brunei",
      "states": [
        { "country_id": 34, "state_name": "Belait" },
        { "country_id": 34, "state_name": "Brunei-Muara" },
        { "country_id": 34, "state_name": "Temburong" },
        { "country_id": 34, "state_name": "Tutong" }
      ]
    },
    {
      "country_id": 35,
      "country_name": "Bulgaria",
      "states": [
        { "country_id": 35, "state_name": "Blagoevgrad" },
        { "country_id": 35, "state_name": "Burgas" },
        { "country_id": 35, "state_name": "Dobrich" },
        { "country_id": 35, "state_name": "Gabrovo" },
        { "country_id": 35, "state_name": "Haskovo" },
        { "country_id": 35, "state_name": "Jambol" },
        { "country_id": 35, "state_name": "Kardzhali" },
        { "country_id": 35, "state_name": "Kjustendil" },
        { "country_id": 35, "state_name": "Lovech" },
        { "country_id": 35, "state_name": "Montana" },
        { "country_id": 35, "state_name": "Oblast Sofiya-Grad" },
        { "country_id": 35, "state_name": "Pazardzhik" },
        { "country_id": 35, "state_name": "Pernik" },
        { "country_id": 35, "state_name": "Pleven" },
        { "country_id": 35, "state_name": "Plovdiv" },
        { "country_id": 35, "state_name": "Razgrad" },
        { "country_id": 35, "state_name": "Ruse" },
        { "country_id": 35, "state_name": "Shumen" },
        { "country_id": 35, "state_name": "Silistra" },
        { "country_id": 35, "state_name": "Sliven" },
        { "country_id": 35, "state_name": "Smoljan" },
        { "country_id": 35, "state_name": "Sofija grad" },
        { "country_id": 35, "state_name": "Sofijska oblast" },
        { "country_id": 35, "state_name": "Stara Zagora" },
        { "country_id": 35, "state_name": "Targovishte" },
        { "country_id": 35, "state_name": "Varna" },
        { "country_id": 35, "state_name": "Veliko Tarnovo" },
        { "country_id": 35, "state_name": "Vidin" },
        { "country_id": 35, "state_name": "Vraca" },
        { "country_id": 35, "state_name": "Yablaniza" }
      ]
    },
    {
      "country_id": 36,
      "country_name": "Burkina Faso",
      "states": [
        { "country_id": 36, "state_name": "Bale" },
        { "country_id": 36, "state_name": "Bam" },
        { "country_id": 36, "state_name": "Bazega" },
        { "country_id": 36, "state_name": "Bougouriba" },
        { "country_id": 36, "state_name": "Boulgou" },
        { "country_id": 36, "state_name": "Boulkiemde" },
        { "country_id": 36, "state_name": "Comoe" },
        { "country_id": 36, "state_name": "Ganzourgou" },
        { "country_id": 36, "state_name": "Gnagna" },
        { "country_id": 36, "state_name": "Gourma" },
        { "country_id": 36, "state_name": "Houet" },
        { "country_id": 36, "state_name": "Ioba" },
        { "country_id": 36, "state_name": "Kadiogo" },
        { "country_id": 36, "state_name": "Kenedougou" },
        { "country_id": 36, "state_name": "Komandjari" },
        { "country_id": 36, "state_name": "Kompienga" },
        { "country_id": 36, "state_name": "Kossi" },
        { "country_id": 36, "state_name": "Kouritenga" },
        { "country_id": 36, "state_name": "Kourweogo" },
        { "country_id": 36, "state_name": "Leraba" },
        { "country_id": 36, "state_name": "Mouhoun" },
        { "country_id": 36, "state_name": "Nahouri" },
        { "country_id": 36, "state_name": "Namentenga" },
        { "country_id": 36, "state_name": "Noumbiel" },
        { "country_id": 36, "state_name": "Oubritenga" },
        { "country_id": 36, "state_name": "Oudalan" },
        { "country_id": 36, "state_name": "Passore" },
        { "country_id": 36, "state_name": "Poni" },
        { "country_id": 36, "state_name": "Sanguie" },
        { "country_id": 36, "state_name": "Sanmatenga" },
        { "country_id": 36, "state_name": "Seno" },
        { "country_id": 36, "state_name": "Sissili" },
        { "country_id": 36, "state_name": "Soum" },
        { "country_id": 36, "state_name": "Sourou" },
        { "country_id": 36, "state_name": "Tapoa" },
        { "country_id": 36, "state_name": "Tuy" },
        { "country_id": 36, "state_name": "Yatenga" },
        { "country_id": 36, "state_name": "Zondoma" },
        { "country_id": 36, "state_name": "Zoundweogo" }
      ]
    },
    {
      "country_id": 37,
      "country_name": "Burundi",
      "states": [
        { "country_id": 37, "state_name": "Bubanza" },
        { "country_id": 37, "state_name": "Bujumbura" },
        { "country_id": 37, "state_name": "Bururi" },
        { "country_id": 37, "state_name": "Cankuzo" },
        { "country_id": 37, "state_name": "Cibitoke" },
        { "country_id": 37, "state_name": "Gitega" },
        { "country_id": 37, "state_name": "Karuzi" },
        { "country_id": 37, "state_name": "Kayanza" },
        { "country_id": 37, "state_name": "Kirundo" },
        { "country_id": 37, "state_name": "Makamba" },
        { "country_id": 37, "state_name": "Muramvya" },
        { "country_id": 37, "state_name": "Muyinga" },
        { "country_id": 37, "state_name": "Ngozi" },
        { "country_id": 37, "state_name": "Rutana" },
        { "country_id": 37, "state_name": "Ruyigi" }
      ]
    },
    {
      "country_id": 38,
      "country_name": "Cambodia",
      "states": [
        { "country_id": 38, "state_name": "Banteay Mean Chey" },
        { "country_id": 38, "state_name": "Bat Dambang" },
        { "country_id": 38, "state_name": "Kampong Cham" },
        { "country_id": 38, "state_name": "Kampong Chhnang" },
        { "country_id": 38, "state_name": "Kampong Spoeu" },
        { "country_id": 38, "state_name": "Kampong Thum" },
        { "country_id": 38, "state_name": "Kampot" },
        { "country_id": 38, "state_name": "Kandal" },
        { "country_id": 38, "state_name": "Kaoh Kong" },
        { "country_id": 38, "state_name": "Kracheh" },
        { "country_id": 38, "state_name": "Krong Kaeb" },
        { "country_id": 38, "state_name": "Krong Pailin" },
        { "country_id": 38, "state_name": "Krong Preah Sihanouk" },
        { "country_id": 38, "state_name": "Mondol Kiri" },
        { "country_id": 38, "state_name": "Otdar Mean Chey" },
        { "country_id": 38, "state_name": "Phnum Penh" },
        { "country_id": 38, "state_name": "Pousat" },
        { "country_id": 38, "state_name": "Preah Vihear" },
        { "country_id": 38, "state_name": "Prey Veaeng" },
        { "country_id": 38, "state_name": "Rotanak Kiri" },
        { "country_id": 38, "state_name": "Siem Reab" },
        { "country_id": 38, "state_name": "Stueng Traeng" },
        { "country_id": 38, "state_name": "Svay Rieng" },
        { "country_id": 38, "state_name": "Takaev" }
      ]
    },
    {
      "country_id": 39,
      "country_name": "Cameroon",
      "states": [
        { "country_id": 39, "state_name": "Adamaoua" },
        { "country_id": 39, "state_name": "Centre" },
        { "country_id": 39, "state_name": "Est" },
        { "country_id": 39, "state_name": "Littoral" },
        { "country_id": 39, "state_name": "Nord" },
        { "country_id": 39, "state_name": "Nord Extreme" },
        { "country_id": 39, "state_name": "Nordouest" },
        { "country_id": 39, "state_name": "Ouest" },
        { "country_id": 39, "state_name": "Sud" },
        { "country_id": 39, "state_name": "Sudouest" }
      ]
    },
    {
      "country_id": 40,
      "country_name": "Canada",
      "states": [
        { "country_id": 40, "state_name": "Alberta" },
        { "country_id": 40, "state_name": "British Columbia" },
        { "country_id": 40, "state_name": "Manitoba" },
        { "country_id": 40, "state_name": "New Brunswick" },
        { "country_id": 40, "state_name": "Newfoundland and Labrador" },
        { "country_id": 40, "state_name": "Northwest Territories" },
        { "country_id": 40, "state_name": "Nova Scotia" },
        { "country_id": 40, "state_name": "Nunavut" },
        { "country_id": 40, "state_name": "Ontario" },
        { "country_id": 40, "state_name": "Prince Edward Island" },
        { "country_id": 40, "state_name": "Quebec" },
        { "country_id": 40, "state_name": "Saskatchewan" },
        { "country_id": 40, "state_name": "Yukon" }
      ]
    },
    {
      "country_id": 41,
      "country_name": "Cape Verde",
      "states": [
        { "country_id": 41, "state_name": "Boavista" },
        { "country_id": 41, "state_name": "Brava" },
        { "country_id": 41, "state_name": "Fogo" },
        { "country_id": 41, "state_name": "Maio" },
        { "country_id": 41, "state_name": "Sal" },
        { "country_id": 41, "state_name": "Santo Antao" },
        { "country_id": 41, "state_name": "Sao Nicolau" },
        { "country_id": 41, "state_name": "Sao Tiago" },
        { "country_id": 41, "state_name": "Sao Vicente" }
      ]
    },
    {
      "country_id": 42,
      "country_name": "Cayman Islands",
      "states": [{ "country_id": 42, "state_name": "Grand Cayman" }]
    },
    {
      "country_id": 43,
      "country_name": "Central African Republic",
      "states": [
        { "country_id": 43, "state_name": "Bamingui-Bangoran" },
        { "country_id": 43, "state_name": "Bangui" },
        { "country_id": 43, "state_name": "Basse-Kotto" },
        { "country_id": 43, "state_name": "Haut-Mbomou" },
        { "country_id": 43, "state_name": "Haute-Kotto" },
        { "country_id": 43, "state_name": "Kemo" },
        { "country_id": 43, "state_name": "Lobaye" },
        { "country_id": 43, "state_name": "Mambere-Kadei" },
        { "country_id": 43, "state_name": "Mbomou" },
        { "country_id": 43, "state_name": "Nana-Gribizi" },
        { "country_id": 43, "state_name": "Nana-Mambere" },
        { "country_id": 43, "state_name": "Ombella Mpoko" },
        { "country_id": 43, "state_name": "Ouaka" },
        { "country_id": 43, "state_name": "Ouham" },
        { "country_id": 43, "state_name": "Ouham-Pende" },
        { "country_id": 43, "state_name": "Sangha-Mbaere" },
        { "country_id": 43, "state_name": "Vakaga" }
      ]
    },
    {
      "country_id": 44,
      "country_name": "Chad",
      "states": [
        { "country_id": 44, "state_name": "Batha" },
        { "country_id": 44, "state_name": "Biltine" },
        { "country_id": 44, "state_name": "Bourkou-Ennedi-Tibesti" },
        { "country_id": 44, "state_name": "Chari-Baguirmi" },
        { "country_id": 44, "state_name": "Guera" },
        { "country_id": 44, "state_name": "Kanem" },
        { "country_id": 44, "state_name": "Lac" },
        { "country_id": 44, "state_name": "Logone Occidental" },
        { "country_id": 44, "state_name": "Logone Oriental" },
        { "country_id": 44, "state_name": "Mayo-Kebbi" },
        { "country_id": 44, "state_name": "Moyen-Chari" },
        { "country_id": 44, "state_name": "Ouaddai" },
        { "country_id": 44, "state_name": "Salamat" },
        { "country_id": 44, "state_name": "Tandjile" }
      ]
    },
    {
      "country_id": 45,
      "country_name": "Chile",
      "states": [
        { "country_id": 45, "state_name": "Aisen" },
        { "country_id": 45, "state_name": "Antofagasta" },
        { "country_id": 45, "state_name": "Araucania" },
        { "country_id": 45, "state_name": "Atacama" },
        { "country_id": 45, "state_name": "Bio Bio" },
        { "country_id": 45, "state_name": "Coquimbo" },
        { "country_id": 45, "state_name": "Libertador General Bernardo O" },
        { "country_id": 45, "state_name": "Los Lagos" },
        { "country_id": 45, "state_name": "Magellanes" },
        { "country_id": 45, "state_name": "Maule" },
        { "country_id": 45, "state_name": "Metropolitana" },
        { "country_id": 45, "state_name": "Metropolitana de Santiago" },
        { "country_id": 45, "state_name": "Tarapaca" },
        { "country_id": 45, "state_name": "Valparaiso" }
      ]
    },
    {
      "country_id": 46,
      "country_name": "China",
      "states": [
        { "country_id": 46, "state_name": "Anhui" },
        { "country_id": 46, "state_name": "Aomen" },
        { "country_id": 46, "state_name": "Beijing" },
        { "country_id": 46, "state_name": "Beijing Shi" },
        { "country_id": 46, "state_name": "Chongqing" },
        { "country_id": 46, "state_name": "Fujian" },
        { "country_id": 46, "state_name": "Gansu" },
        { "country_id": 46, "state_name": "Guangdong" },
        { "country_id": 46, "state_name": "Guangxi" },
        { "country_id": 46, "state_name": "Guizhou" },
        { "country_id": 46, "state_name": "Hainan" },
        { "country_id": 46, "state_name": "Hebei" },
        { "country_id": 46, "state_name": "Heilongjiang" },
        { "country_id": 46, "state_name": "Henan" },
        { "country_id": 46, "state_name": "Hubei" },
        { "country_id": 46, "state_name": "Hunan" },
        { "country_id": 46, "state_name": "Jiangsu" },
        { "country_id": 46, "state_name": "Jiangxi" },
        { "country_id": 46, "state_name": "Jilin" },
        { "country_id": 46, "state_name": "Liaoning" },
        { "country_id": 46, "state_name": "Nei Monggol" },
        { "country_id": 46, "state_name": "Ningxia Hui" },
        { "country_id": 46, "state_name": "Qinghai" },
        { "country_id": 46, "state_name": "Shaanxi" },
        { "country_id": 46, "state_name": "Shandong" },
        { "country_id": 46, "state_name": "Shanghai" },
        { "country_id": 46, "state_name": "Shanxi" },
        { "country_id": 46, "state_name": "Sichuan" },
        { "country_id": 46, "state_name": "Tianjin" },
        { "country_id": 46, "state_name": "Xianggang" },
        { "country_id": 46, "state_name": "Xinjiang" },
        { "country_id": 46, "state_name": "Xizang" },
        { "country_id": 46, "state_name": "Yunnan" },
        { "country_id": 46, "state_name": "Zhejiang" }
      ]
    },
    {
      "country_id": 47,
      "country_name": "Christmas Island",
      "states": [{ "country_id": 47, "state_name": "Christmas Island" }]
    },
    {
      "country_id": 48,
      "country_name": "Cocos (Keeling) Islands",
      "states": [{ "country_id": 48, "state_name": "Cocos (Keeling) Islands" }]
    },
    {
      "country_id": 49,
      "country_name": "Colombia",
      "states": [
        { "country_id": 49, "state_name": "Amazonas" },
        { "country_id": 49, "state_name": "Antioquia" },
        { "country_id": 49, "state_name": "Arauca" },
        { "country_id": 49, "state_name": "Atlantico" },
        { "country_id": 49, "state_name": "Bogota" },
        { "country_id": 49, "state_name": "Bolivar" },
        { "country_id": 49, "state_name": "Boyaca" },
        { "country_id": 49, "state_name": "Caldas" },
        { "country_id": 49, "state_name": "Caqueta" },
        { "country_id": 49, "state_name": "Casanare" },
        { "country_id": 49, "state_name": "Cauca" },
        { "country_id": 49, "state_name": "Cesar" },
        { "country_id": 49, "state_name": "Choco" },
        { "country_id": 49, "state_name": "Cordoba" },
        { "country_id": 49, "state_name": "Cundinamarca" },
        { "country_id": 49, "state_name": "Guainia" },
        { "country_id": 49, "state_name": "Guaviare" },
        { "country_id": 49, "state_name": "Huila" },
        { "country_id": 49, "state_name": "La Guajira" },
        { "country_id": 49, "state_name": "Magdalena" },
        { "country_id": 49, "state_name": "Meta" },
        { "country_id": 49, "state_name": "Narino" },
        { "country_id": 49, "state_name": "Norte de Santander" },
        { "country_id": 49, "state_name": "Putumayo" },
        { "country_id": 49, "state_name": "Quindio" },
        { "country_id": 49, "state_name": "Risaralda" },
        { "country_id": 49, "state_name": "San Andres y Providencia" },
        { "country_id": 49, "state_name": "Santander" },
        { "country_id": 49, "state_name": "Sucre" },
        { "country_id": 49, "state_name": "Tolima" },
        { "country_id": 49, "state_name": "Valle del Cauca" },
        { "country_id": 49, "state_name": "Vaupes" },
        { "country_id": 49, "state_name": "Vichada" }
      ]
    },
    {
      "country_id": 50,
      "country_name": "Comoros",
      "states": [
        { "country_id": 50, "state_name": "Mwali" },
        { "country_id": 50, "state_name": "Njazidja" },
        { "country_id": 50, "state_name": "Nzwani" }
      ]
    },
    {
      "country_id": 51,
      "country_name": "Republic Of The Congo",
      "states": [
        { "country_id": 51, "state_name": "Bouenza" },
        { "country_id": 51, "state_name": "Brazzaville" },
        { "country_id": 51, "state_name": "Cuvette" },
        { "country_id": 51, "state_name": "Kouilou" },
        { "country_id": 51, "state_name": "Lekoumou" },
        { "country_id": 51, "state_name": "Likouala" },
        { "country_id": 51, "state_name": "Niari" },
        { "country_id": 51, "state_name": "Plateaux" },
        { "country_id": 51, "state_name": "Pool" },
        { "country_id": 51, "state_name": "Sangha" }
      ]
    },
    {
      "country_id": 52,
      "country_name": "Democratic Republic Of The Congo",
      "states": [
        { "country_id": 52, "state_name": "Bandundu" },
        { "country_id": 52, "state_name": "Bas-Congo" },
        { "country_id": 52, "state_name": "Equateur" },
        { "country_id": 52, "state_name": "Haut-Congo" },
        { "country_id": 52, "state_name": "Kasai-Occidental" },
        { "country_id": 52, "state_name": "Kasai-Oriental" },
        { "country_id": 52, "state_name": "Katanga" },
        { "country_id": 52, "state_name": "Kinshasa" },
        { "country_id": 52, "state_name": "Maniema" },
        { "country_id": 52, "state_name": "Nord-Kivu" },
        { "country_id": 52, "state_name": "Sud-Kivu" }
      ]
    },
    {
      "country_id": 53,
      "country_name": "Cook Islands",
      "states": [
        { "country_id": 53, "state_name": "Aitutaki" },
        { "country_id": 53, "state_name": "Atiu" },
        { "country_id": 53, "state_name": "Mangaia" },
        { "country_id": 53, "state_name": "Manihiki" },
        { "country_id": 53, "state_name": "Mauke" },
        { "country_id": 53, "state_name": "Mitiaro" },
        { "country_id": 53, "state_name": "Nassau" },
        { "country_id": 53, "state_name": "Pukapuka" },
        { "country_id": 53, "state_name": "Rakahanga" },
        { "country_id": 53, "state_name": "Rarotonga" },
        { "country_id": 53, "state_name": "Tongareva" }
      ]
    },
    {
      "country_id": 54,
      "country_name": "Costa Rica",
      "states": [
        { "country_id": 54, "state_name": "Alajuela" },
        { "country_id": 54, "state_name": "Cartago" },
        { "country_id": 54, "state_name": "Guanacaste" },
        { "country_id": 54, "state_name": "Heredia" },
        { "country_id": 54, "state_name": "Limon" },
        { "country_id": 54, "state_name": "Puntarenas" },
        { "country_id": 54, "state_name": "San Jose" }
      ]
    },
    {
      "country_id": 55,
      "country_name": "Cote D'Ivoire (Ivory Coast)",
      "states": [
        { "country_id": 55, "state_name": "Abidjan" },
        { "country_id": 55, "state_name": "Agneby" },
        { "country_id": 55, "state_name": "Bafing" },
        { "country_id": 55, "state_name": "Denguele" },
        { "country_id": 55, "state_name": "Dix-huit Montagnes" },
        { "country_id": 55, "state_name": "Fromager" },
        { "country_id": 55, "state_name": "Haut-Sassandra" },
        { "country_id": 55, "state_name": "Lacs" },
        { "country_id": 55, "state_name": "Lagunes" },
        { "country_id": 55, "state_name": "Marahoue" },
        { "country_id": 55, "state_name": "Moyen-Cavally" },
        { "country_id": 55, "state_name": "Moyen-Comoe" },
        { "country_id": 55, "state_name": "N'zi-Comoe" },
        { "country_id": 55, "state_name": "Sassandra" },
        { "country_id": 55, "state_name": "Savanes" },
        { "country_id": 55, "state_name": "Sud-Bandama" },
        { "country_id": 55, "state_name": "Sud-Comoe" },
        { "country_id": 55, "state_name": "Vallee du Bandama" },
        { "country_id": 55, "state_name": "Worodougou" },
        { "country_id": 55, "state_name": "Zanzan" }
      ]
    },
    {
      "country_id": 56,
      "country_name": "Croatia Hrvatska)",
      "states": [
        { "country_id": 56, "state_name": "Bjelovar-Bilogora" },
        { "country_id": 56, "state_name": "Dubrovnik-Neretva" },
        { "country_id": 56, "state_name": "Grad Zagreb" },
        { "country_id": 56, "state_name": "Istra" },
        { "country_id": 56, "state_name": "Karlovac" },
        { "country_id": 56, "state_name": "Koprivnica-Krizhevci" },
        { "country_id": 56, "state_name": "Krapina-Zagorje" },
        { "country_id": 56, "state_name": "Lika-Senj" },
        { "country_id": 56, "state_name": "Medhimurje" },
        { "country_id": 56, "state_name": "Medimurska Zupanija" },
        { "country_id": 56, "state_name": "Osijek-Baranja" },
        { "country_id": 56, "state_name": "Osjecko-Baranjska Zupanija" },
        { "country_id": 56, "state_name": "Pozhega-Slavonija" },
        { "country_id": 56, "state_name": "Primorje-Gorski Kotar" },
        { "country_id": 56, "state_name": "Shibenik-Knin" },
        { "country_id": 56, "state_name": "Sisak-Moslavina" },
        { "country_id": 56, "state_name": "Slavonski Brod-Posavina" },
        { "country_id": 56, "state_name": "Split-Dalmacija" },
        { "country_id": 56, "state_name": "Varazhdin" },
        { "country_id": 56, "state_name": "Virovitica-Podravina" },
        { "country_id": 56, "state_name": "Vukovar-Srijem" },
        { "country_id": 56, "state_name": "Zadar" },
        { "country_id": 56, "state_name": "Zagreb" }
      ]
    },
    {
      "country_id": 57,
      "country_name": "Cuba",
      "states": [
        { "country_id": 57, "state_name": "Camaguey" },
        { "country_id": 57, "state_name": "Ciego de Avila" },
        { "country_id": 57, "state_name": "Cienfuegos" },
        { "country_id": 57, "state_name": "Ciudad de la Habana" },
        { "country_id": 57, "state_name": "Granma" },
        { "country_id": 57, "state_name": "Guantanamo" },
        { "country_id": 57, "state_name": "Habana" },
        { "country_id": 57, "state_name": "Holguin" },
        { "country_id": 57, "state_name": "Isla de la Juventud" },
        { "country_id": 57, "state_name": "La Habana" },
        { "country_id": 57, "state_name": "Las Tunas" },
        { "country_id": 57, "state_name": "Matanzas" },
        { "country_id": 57, "state_name": "Pinar del Rio" },
        { "country_id": 57, "state_name": "Sancti Spiritus" },
        { "country_id": 57, "state_name": "Santiago de Cuba" },
        { "country_id": 57, "state_name": "Villa Clara" }
      ]
    },
    {
      "country_id": 58,
      "country_name": "Cyprus",
      "states": [
        { "country_id": 58, "state_name": "Government controlled area" },
        { "country_id": 58, "state_name": "Limassol" },
        { "country_id": 58, "state_name": "Nicosia District" },
        { "country_id": 58, "state_name": "Paphos" },
        { "country_id": 58, "state_name": "Turkish controlled area" }
      ]
    },
    {
      "country_id": 59,
      "country_name": "Czech Republic",
      "states": [
        { "country_id": 59, "state_name": "Central Bohemian" },
        { "country_id": 59, "state_name": "Frycovice" },
        { "country_id": 59, "state_name": "Jihocesky Kraj" },
        { "country_id": 59, "state_name": "Jihochesky" },
        { "country_id": 59, "state_name": "Jihomoravsky" },
        { "country_id": 59, "state_name": "Karlovarsky" },
        { "country_id": 59, "state_name": "Klecany" },
        { "country_id": 59, "state_name": "Kralovehradecky" },
        { "country_id": 59, "state_name": "Liberecky" },
        { "country_id": 59, "state_name": "Lipov" },
        { "country_id": 59, "state_name": "Moravskoslezsky" },
        { "country_id": 59, "state_name": "Olomoucky" },
        { "country_id": 59, "state_name": "Olomoucky Kraj" },
        { "country_id": 59, "state_name": "Pardubicky" },
        { "country_id": 59, "state_name": "Plzensky" },
        { "country_id": 59, "state_name": "Praha" },
        { "country_id": 59, "state_name": "Rajhrad" },
        { "country_id": 59, "state_name": "Smirice" },
        { "country_id": 59, "state_name": "South Moravian" },
        { "country_id": 59, "state_name": "Straz nad Nisou" },
        { "country_id": 59, "state_name": "Stredochesky" },
        { "country_id": 59, "state_name": "Unicov" },
        { "country_id": 59, "state_name": "Ustecky" },
        { "country_id": 59, "state_name": "Valletta" },
        { "country_id": 59, "state_name": "Velesin" },
        { "country_id": 59, "state_name": "Vysochina" },
        { "country_id": 59, "state_name": "Zlinsky" }
      ]
    },
    {
      "country_id": 60,
      "country_name": "Denmark",
      "states": [
        { "country_id": 60, "state_name": "Arhus" },
        { "country_id": 60, "state_name": "Bornholm" },
        { "country_id": 60, "state_name": "Frederiksborg" },
        { "country_id": 60, "state_name": "Fyn" },
        { "country_id": 60, "state_name": "Hovedstaden" },
        { "country_id": 60, "state_name": "Kobenhavn" },
        { "country_id": 60, "state_name": "Kobenhavns Amt" },
        { "country_id": 60, "state_name": "Kobenhavns Kommune" },
        { "country_id": 60, "state_name": "Nordjylland" },
        { "country_id": 60, "state_name": "Ribe" },
        { "country_id": 60, "state_name": "Ringkobing" },
        { "country_id": 60, "state_name": "Roervig" },
        { "country_id": 60, "state_name": "Roskilde" },
        { "country_id": 60, "state_name": "Roslev" },
        { "country_id": 60, "state_name": "Sjaelland" },
        { "country_id": 60, "state_name": "Soeborg" },
        { "country_id": 60, "state_name": "Sonderjylland" },
        { "country_id": 60, "state_name": "Storstrom" },
        { "country_id": 60, "state_name": "Syddanmark" },
        { "country_id": 60, "state_name": "Toelloese" },
        { "country_id": 60, "state_name": "Vejle" },
        { "country_id": 60, "state_name": "Vestsjalland" },
        { "country_id": 60, "state_name": "Viborg" }
      ]
    },
    {
      "country_id": 61,
      "country_name": "Djibouti",
      "states": [
        { "country_id": 61, "state_name": "Ali Sabih" },
        { "country_id": 61, "state_name": "Dikhil" },
        { "country_id": 61, "state_name": "Jibuti" },
        { "country_id": 61, "state_name": "Tajurah" },
        { "country_id": 61, "state_name": "Ubuk" }
      ]
    },
    {
      "country_id": 62,
      "country_name": "Dominica",
      "states": [
        { "country_id": 62, "state_name": "Saint Andrew" },
        { "country_id": 62, "state_name": "Saint David" },
        { "country_id": 62, "state_name": "Saint George" },
        { "country_id": 62, "state_name": "Saint John" },
        { "country_id": 62, "state_name": "Saint Joseph" },
        { "country_id": 62, "state_name": "Saint Luke" },
        { "country_id": 62, "state_name": "Saint Mark" },
        { "country_id": 62, "state_name": "Saint Patrick" },
        { "country_id": 62, "state_name": "Saint Paul" },
        { "country_id": 62, "state_name": "Saint Peter" }
      ]
    },
    {
      "country_id": 63,
      "country_name": "Dominican Republic",
      "states": [
        { "country_id": 63, "state_name": "Azua" },
        { "country_id": 63, "state_name": "Bahoruco" },
        { "country_id": 63, "state_name": "Barahona" },
        { "country_id": 63, "state_name": "Dajabon" },
        { "country_id": 63, "state_name": "Distrito Nacional" },
        { "country_id": 63, "state_name": "Duarte" },
        { "country_id": 63, "state_name": "El Seybo" },
        { "country_id": 63, "state_name": "Elias Pina" },
        { "country_id": 63, "state_name": "Espaillat" },
        { "country_id": 63, "state_name": "Hato Mayor" },
        { "country_id": 63, "state_name": "Independencia" },
        { "country_id": 63, "state_name": "La Altagracia" },
        { "country_id": 63, "state_name": "La Romana" },
        { "country_id": 63, "state_name": "La Vega" },
        { "country_id": 63, "state_name": "Maria Trinidad Sanchez" },
        { "country_id": 63, "state_name": "Monsenor Nouel" },
        { "country_id": 63, "state_name": "Monte Cristi" },
        { "country_id": 63, "state_name": "Monte Plata" },
        { "country_id": 63, "state_name": "Pedernales" },
        { "country_id": 63, "state_name": "Peravia" },
        { "country_id": 63, "state_name": "Puerto Plata" },
        { "country_id": 63, "state_name": "Salcedo" },
        { "country_id": 63, "state_name": "Samana" },
        { "country_id": 63, "state_name": "San Cristobal" },
        { "country_id": 63, "state_name": "San Juan" },
        { "country_id": 63, "state_name": "San Pedro de Macoris" },
        { "country_id": 63, "state_name": "Sanchez Ramirez" },
        { "country_id": 63, "state_name": "Santiago" },
        { "country_id": 63, "state_name": "Santiago Rodriguez" },
        { "country_id": 63, "state_name": "Valverde" }
      ]
    },
    {
      "country_id": 64,
      "country_name": "East Timor",
      "states": [
        { "country_id": 64, "state_name": "Aileu" },
        { "country_id": 64, "state_name": "Ainaro" },
        { "country_id": 64, "state_name": "Ambeno" },
        { "country_id": 64, "state_name": "Baucau" },
        { "country_id": 64, "state_name": "Bobonaro" },
        { "country_id": 64, "state_name": "Cova Lima" },
        { "country_id": 64, "state_name": "Dili" },
        { "country_id": 64, "state_name": "Ermera" },
        { "country_id": 64, "state_name": "Lautem" },
        { "country_id": 64, "state_name": "Liquica" },
        { "country_id": 64, "state_name": "Manatuto" },
        { "country_id": 64, "state_name": "Manufahi" },
        { "country_id": 64, "state_name": "Viqueque" }
      ]
    },
    {
      "country_id": 65,
      "country_name": "Ecuador",
      "states": [
        { "country_id": 65, "state_name": "Azuay" },
        { "country_id": 65, "state_name": "Bolivar" },
        { "country_id": 65, "state_name": "Canar" },
        { "country_id": 65, "state_name": "Carchi" },
        { "country_id": 65, "state_name": "Chimborazo" },
        { "country_id": 65, "state_name": "Cotopaxi" },
        { "country_id": 65, "state_name": "El Oro" },
        { "country_id": 65, "state_name": "Esmeraldas" },
        { "country_id": 65, "state_name": "Galapagos" },
        { "country_id": 65, "state_name": "Guayas" },
        { "country_id": 65, "state_name": "Imbabura" },
        { "country_id": 65, "state_name": "Loja" },
        { "country_id": 65, "state_name": "Los Rios" },
        { "country_id": 65, "state_name": "Manabi" },
        { "country_id": 65, "state_name": "Morona Santiago" },
        { "country_id": 65, "state_name": "Napo" },
        { "country_id": 65, "state_name": "Orellana" },
        { "country_id": 65, "state_name": "Pastaza" },
        { "country_id": 65, "state_name": "Pichincha" },
        { "country_id": 65, "state_name": "Sucumbios" },
        { "country_id": 65, "state_name": "Tungurahua" },
        { "country_id": 65, "state_name": "Zamora Chinchipe" }
      ]
    },
    {
      "country_id": 66,
      "country_name": "Egypt",
      "states": [
        { "country_id": 66, "state_name": "Aswan" },
        { "country_id": 66, "state_name": "Asyut" },
        { "country_id": 66, "state_name": "Bani Suwayf" },
        { "country_id": 66, "state_name": "Bur Sa'id" },
        { "country_id": 66, "state_name": "Cairo" },
        { "country_id": 66, "state_name": "Dumyat" },
        { "country_id": 66, "state_name": "Kafr-ash-Shaykh" },
        { "country_id": 66, "state_name": "Matruh" },
        { "country_id": 66, "state_name": "Muhafazat ad Daqahliyah" },
        { "country_id": 66, "state_name": "Muhafazat al Fayyum" },
        { "country_id": 66, "state_name": "Muhafazat al Gharbiyah" },
        { "country_id": 66, "state_name": "Muhafazat al Iskandariyah" },
        { "country_id": 66, "state_name": "Muhafazat al Qahirah" },
        { "country_id": 66, "state_name": "Qina" },
        { "country_id": 66, "state_name": "Sawhaj" },
        { "country_id": 66, "state_name": "Sina al-Janubiyah" },
        { "country_id": 66, "state_name": "Sina ash-Shamaliyah" },
        { "country_id": 66, "state_name": "ad-Daqahliyah" },
        { "country_id": 66, "state_name": "al-Bahr-al-Ahmar" },
        { "country_id": 66, "state_name": "al-Buhayrah" },
        { "country_id": 66, "state_name": "al-Fayyum" },
        { "country_id": 66, "state_name": "al-Gharbiyah" },
        { "country_id": 66, "state_name": "al-Iskandariyah" },
        { "country_id": 66, "state_name": "al-Ismailiyah" },
        { "country_id": 66, "state_name": "al-Jizah" },
        { "country_id": 66, "state_name": "al-Minufiyah" },
        { "country_id": 66, "state_name": "al-Minya" },
        { "country_id": 66, "state_name": "al-Qahira" },
        { "country_id": 66, "state_name": "al-Qalyubiyah" },
        { "country_id": 66, "state_name": "al-Uqsur" },
        { "country_id": 66, "state_name": "al-Wadi al-Jadid" },
        { "country_id": 66, "state_name": "as-Suways" },
        { "country_id": 66, "state_name": "ash-Sharqiyah" }
      ]
    },
    {
      "country_id": 67,
      "country_name": "El Salvador",
      "states": [
        { "country_id": 67, "state_name": "Ahuachapan" },
        { "country_id": 67, "state_name": "Cabanas" },
        { "country_id": 67, "state_name": "Chalatenango" },
        { "country_id": 67, "state_name": "Cuscatlan" },
        { "country_id": 67, "state_name": "La Libertad" },
        { "country_id": 67, "state_name": "La Paz" },
        { "country_id": 67, "state_name": "La Union" },
        { "country_id": 67, "state_name": "Morazan" },
        { "country_id": 67, "state_name": "San Miguel" },
        { "country_id": 67, "state_name": "San Salvador" },
        { "country_id": 67, "state_name": "San Vicente" },
        { "country_id": 67, "state_name": "Santa Ana" },
        { "country_id": 67, "state_name": "Sonsonate" },
        { "country_id": 67, "state_name": "Usulutan" }
      ]
    },
    {
      "country_id": 68,
      "country_name": "Equatorial Guinea",
      "states": [
        { "country_id": 68, "state_name": "Annobon" },
        { "country_id": 68, "state_name": "Bioko Norte" },
        { "country_id": 68, "state_name": "Bioko Sur" },
        { "country_id": 68, "state_name": "Centro Sur" },
        { "country_id": 68, "state_name": "Kie-Ntem" },
        { "country_id": 68, "state_name": "Litoral" },
        { "country_id": 68, "state_name": "Wele-Nzas" }
      ]
    },
    {
      "country_id": 69,
      "country_name": "Eritrea",
      "states": [
        { "country_id": 69, "state_name": "Anseba" },
        { "country_id": 69, "state_name": "Debub" },
        { "country_id": 69, "state_name": "Debub-Keih-Bahri" },
        { "country_id": 69, "state_name": "Gash-Barka" },
        { "country_id": 69, "state_name": "Maekel" },
        { "country_id": 69, "state_name": "Semien-Keih-Bahri" }
      ]
    },
    {
      "country_id": 70,
      "country_name": "Estonia",
      "states": [
        { "country_id": 70, "state_name": "Harju" },
        { "country_id": 70, "state_name": "Hiiu" },
        { "country_id": 70, "state_name": "Ida-Viru" },
        { "country_id": 70, "state_name": "Jarva" },
        { "country_id": 70, "state_name": "Jogeva" },
        { "country_id": 70, "state_name": "Laane" },
        { "country_id": 70, "state_name": "Laane-Viru" },
        { "country_id": 70, "state_name": "Parnu" },
        { "country_id": 70, "state_name": "Polva" },
        { "country_id": 70, "state_name": "Rapla" },
        { "country_id": 70, "state_name": "Saare" },
        { "country_id": 70, "state_name": "Tartu" },
        { "country_id": 70, "state_name": "Valga" },
        { "country_id": 70, "state_name": "Viljandi" },
        { "country_id": 70, "state_name": "Voru" }
      ]
    },
    {
      "country_id": 71,
      "country_name": "Ethiopia",
      "states": [
        { "country_id": 71, "state_name": "Addis Abeba" },
        { "country_id": 71, "state_name": "Afar" },
        { "country_id": 71, "state_name": "Amhara" },
        { "country_id": 71, "state_name": "Benishangul" },
        { "country_id": 71, "state_name": "Diredawa" },
        { "country_id": 71, "state_name": "Gambella" },
        { "country_id": 71, "state_name": "Harar" },
        { "country_id": 71, "state_name": "Jigjiga" },
        { "country_id": 71, "state_name": "Mekele" },
        { "country_id": 71, "state_name": "Oromia" },
        { "country_id": 71, "state_name": "Somali" },
        { "country_id": 71, "state_name": "Southern" },
        { "country_id": 71, "state_name": "Tigray" }
      ]
    },
    {
      "country_id": 72,
      "country_name": "External Territories of Australia",
      "states": [
        { "country_id": 72, "state_name": "Christmas Island" },
        { "country_id": 72, "state_name": "Cocos Islands" },
        { "country_id": 72, "state_name": "Coral Sea Islands" }
      ]
    },
    {
      "country_id": 73,
      "country_name": "Falkland Islands",
      "states": [
        { "country_id": 73, "state_name": "Falkland Islands" },
        { "country_id": 73, "state_name": "South Georgia" }
      ]
    },
    {
      "country_id": 74,
      "country_name": "Faroe Islands",
      "states": [
        { "country_id": 74, "state_name": "Klaksvik" },
        { "country_id": 74, "state_name": "Nor ara Eysturoy" },
        { "country_id": 74, "state_name": "Nor oy" },
        { "country_id": 74, "state_name": "Sandoy" },
        { "country_id": 74, "state_name": "Streymoy" },
        { "country_id": 74, "state_name": "Su uroy" },
        { "country_id": 74, "state_name": "Sy ra Eysturoy" },
        { "country_id": 74, "state_name": "Torshavn" },
        { "country_id": 74, "state_name": "Vaga" }
      ]
    },
    {
      "country_id": 75,
      "country_name": "Fiji Islands",
      "states": [
        { "country_id": 75, "state_name": "Central" },
        { "country_id": 75, "state_name": "Eastern" },
        { "country_id": 75, "state_name": "Northern" },
        { "country_id": 75, "state_name": "South Pacific" },
        { "country_id": 75, "state_name": "Western" }
      ]
    },
    {
      "country_id": 76,
      "country_name": "Finland",
      "states": [
        { "country_id": 76, "state_name": "Ahvenanmaa" },
        { "country_id": 76, "state_name": "Etela-Karjala" },
        { "country_id": 76, "state_name": "Etela-Pohjanmaa" },
        { "country_id": 76, "state_name": "Etela-Savo" },
        { "country_id": 76, "state_name": "Etela-Suomen Laani" },
        { "country_id": 76, "state_name": "Ita-Suomen Laani" },
        { "country_id": 76, "state_name": "Ita-Uusimaa" },
        { "country_id": 76, "state_name": "Kainuu" },
        { "country_id": 76, "state_name": "Kanta-Hame" },
        { "country_id": 76, "state_name": "Keski-Pohjanmaa" },
        { "country_id": 76, "state_name": "Keski-Suomi" },
        { "country_id": 76, "state_name": "Kymenlaakso" },
        { "country_id": 76, "state_name": "Lansi-Suomen Laani" },
        { "country_id": 76, "state_name": "Lappi" },
        { "country_id": 76, "state_name": "Northern Savonia" },
        { "country_id": 76, "state_name": "Ostrobothnia" },
        { "country_id": 76, "state_name": "Oulun Laani" },
        { "country_id": 76, "state_name": "Paijat-Hame" },
        { "country_id": 76, "state_name": "Pirkanmaa" },
        { "country_id": 76, "state_name": "Pohjanmaa" },
        { "country_id": 76, "state_name": "Pohjois-Karjala" },
        { "country_id": 76, "state_name": "Pohjois-Pohjanmaa" },
        { "country_id": 76, "state_name": "Pohjois-Savo" },
        { "country_id": 76, "state_name": "Saarijarvi" },
        { "country_id": 76, "state_name": "Satakunta" },
        { "country_id": 76, "state_name": "Southern Savonia" },
        { "country_id": 76, "state_name": "Tavastia Proper" },
        { "country_id": 76, "state_name": "Uleaborgs Lan" },
        { "country_id": 76, "state_name": "Uusimaa" },
        { "country_id": 76, "state_name": "Varsinais-Suomi" }
      ]
    },
    {
      "country_id": 77,
      "country_name": "France",
      "states": [
        { "country_id": 77, "state_name": "Ain" },
        { "country_id": 77, "state_name": "Aisne" },
        { "country_id": 77, "state_name": "Albi Le Sequestre" },
        { "country_id": 77, "state_name": "Allier" },
        { "country_id": 77, "state_name": "Alpes-Cote dAzur" },
        { "country_id": 77, "state_name": "Alpes-Maritimes" },
        { "country_id": 77, "state_name": "Alpes-de-Haute-Provence" },
        { "country_id": 77, "state_name": "Alsace" },
        { "country_id": 77, "state_name": "Aquitaine" },
        { "country_id": 77, "state_name": "Ardeche" },
        { "country_id": 77, "state_name": "Ardennes" },
        { "country_id": 77, "state_name": "Ariege" },
        { "country_id": 77, "state_name": "Aube" },
        { "country_id": 77, "state_name": "Aude" },
        { "country_id": 77, "state_name": "Auvergne" },
        { "country_id": 77, "state_name": "Aveyron" },
        { "country_id": 77, "state_name": "Bas-Rhin" },
        { "country_id": 77, "state_name": "Basse-Normandie" },
        { "country_id": 77, "state_name": "Bouches-du-Rhone" },
        { "country_id": 77, "state_name": "Bourgogne" },
        { "country_id": 77, "state_name": "Bretagne" },
        { "country_id": 77, "state_name": "Brittany" },
        { "country_id": 77, "state_name": "Burgundy" },
        { "country_id": 77, "state_name": "Calvados" },
        { "country_id": 77, "state_name": "Cantal" },
        { "country_id": 77, "state_name": "Cedex" },
        { "country_id": 77, "state_name": "Centre" },
        { "country_id": 77, "state_name": "Charente" },
        { "country_id": 77, "state_name": "Charente-Maritime" },
        { "country_id": 77, "state_name": "Cher" },
        { "country_id": 77, "state_name": "Correze" },
        { "country_id": 77, "state_name": "Corse-du-Sud" },
        { "country_id": 77, "state_name": "Cote-d'Or" },
        { "country_id": 77, "state_name": "Cotes-d'Armor" },
        { "country_id": 77, "state_name": "Creuse" },
        { "country_id": 77, "state_name": "Crolles" },
        { "country_id": 77, "state_name": "Deux-Sevres" },
        { "country_id": 77, "state_name": "Dordogne" },
        { "country_id": 77, "state_name": "Doubs" },
        { "country_id": 77, "state_name": "Drome" },
        { "country_id": 77, "state_name": "Essonne" },
        { "country_id": 77, "state_name": "Eure" },
        { "country_id": 77, "state_name": "Eure-et-Loir" },
        { "country_id": 77, "state_name": "Feucherolles" },
        { "country_id": 77, "state_name": "Finistere" },
        { "country_id": 77, "state_name": "Franche-Comte" },
        { "country_id": 77, "state_name": "Gard" },
        { "country_id": 77, "state_name": "Gers" },
        { "country_id": 77, "state_name": "Gironde" },
        { "country_id": 77, "state_name": "Haut-Rhin" },
        { "country_id": 77, "state_name": "Haute-Corse" },
        { "country_id": 77, "state_name": "Haute-Garonne" },
        { "country_id": 77, "state_name": "Haute-Loire" },
        { "country_id": 77, "state_name": "Haute-Marne" },
        { "country_id": 77, "state_name": "Haute-Saone" },
        { "country_id": 77, "state_name": "Haute-Savoie" },
        { "country_id": 77, "state_name": "Haute-Vienne" },
        { "country_id": 77, "state_name": "Hautes-Alpes" },
        { "country_id": 77, "state_name": "Hautes-Pyrenees" },
        { "country_id": 77, "state_name": "Hauts-de-Seine" },
        { "country_id": 77, "state_name": "Herault" },
        { "country_id": 77, "state_name": "Ile-de-France" },
        { "country_id": 77, "state_name": "Ille-et-Vilaine" },
        { "country_id": 77, "state_name": "Indre" },
        { "country_id": 77, "state_name": "Indre-et-Loire" },
        { "country_id": 77, "state_name": "Isere" },
        { "country_id": 77, "state_name": "Jura" },
        { "country_id": 77, "state_name": "Klagenfurt" },
        { "country_id": 77, "state_name": "Landes" },
        { "country_id": 77, "state_name": "Languedoc-Roussillon" },
        { "country_id": 77, "state_name": "Larcay" },
        { "country_id": 77, "state_name": "Le Castellet" },
        { "country_id": 77, "state_name": "Le Creusot" },
        { "country_id": 77, "state_name": "Limousin" },
        { "country_id": 77, "state_name": "Loir-et-Cher" },
        { "country_id": 77, "state_name": "Loire" },
        { "country_id": 77, "state_name": "Loire-Atlantique" },
        { "country_id": 77, "state_name": "Loiret" },
        { "country_id": 77, "state_name": "Lorraine" },
        { "country_id": 77, "state_name": "Lot" },
        { "country_id": 77, "state_name": "Lot-et-Garonne" },
        { "country_id": 77, "state_name": "Lower Normandy" },
        { "country_id": 77, "state_name": "Lozere" },
        { "country_id": 77, "state_name": "Maine-et-Loire" },
        { "country_id": 77, "state_name": "Manche" },
        { "country_id": 77, "state_name": "Marne" },
        { "country_id": 77, "state_name": "Mayenne" },
        { "country_id": 77, "state_name": "Meurthe-et-Moselle" },
        { "country_id": 77, "state_name": "Meuse" },
        { "country_id": 77, "state_name": "Midi-Pyrenees" },
        { "country_id": 77, "state_name": "Morbihan" },
        { "country_id": 77, "state_name": "Moselle" },
        { "country_id": 77, "state_name": "Nievre" },
        { "country_id": 77, "state_name": "Nord" },
        { "country_id": 77, "state_name": "Nord-Pas-de-Calais" },
        { "country_id": 77, "state_name": "Oise" },
        { "country_id": 77, "state_name": "Orne" },
        { "country_id": 77, "state_name": "Paris" },
        { "country_id": 77, "state_name": "Pas-de-Calais" },
        { "country_id": 77, "state_name": "Pays de la Loire" },
        { "country_id": 77, "state_name": "Pays-de-la-Loire" },
        { "country_id": 77, "state_name": "Picardy" },
        { "country_id": 77, "state_name": "Puy-de-Dome" },
        { "country_id": 77, "state_name": "Pyrenees-Atlantiques" },
        { "country_id": 77, "state_name": "Pyrenees-Orientales" },
        { "country_id": 77, "state_name": "Quelmes" },
        { "country_id": 77, "state_name": "Rhone" },
        { "country_id": 77, "state_name": "Rhone-Alpes" },
        { "country_id": 77, "state_name": "Saint Ouen" },
        { "country_id": 77, "state_name": "Saint Viatre" },
        { "country_id": 77, "state_name": "Saone-et-Loire" },
        { "country_id": 77, "state_name": "Sarthe" },
        { "country_id": 77, "state_name": "Savoie" },
        { "country_id": 77, "state_name": "Seine-Maritime" },
        { "country_id": 77, "state_name": "Seine-Saint-Denis" },
        { "country_id": 77, "state_name": "Seine-et-Marne" },
        { "country_id": 77, "state_name": "Somme" },
        { "country_id": 77, "state_name": "Sophia Antipolis" },
        { "country_id": 77, "state_name": "Souvans" },
        { "country_id": 77, "state_name": "Tarn" },
        { "country_id": 77, "state_name": "Tarn-et-Garonne" },
        { "country_id": 77, "state_name": "Territoire de Belfort" },
        { "country_id": 77, "state_name": "Treignac" },
        { "country_id": 77, "state_name": "Upper Normandy" },
        { "country_id": 77, "state_name": "Val-d'Oise'" },
        { "country_id": 77, "state_name": "Val-de-Marne" },
        { "country_id": 77, "state_name": "Var" },
        { "country_id": 77, "state_name": "Vaucluse" },
        { "country_id": 77, "state_name": "Vellise" },
        { "country_id": 77, "state_name": "Vendee" },
        { "country_id": 77, "state_name": "Vienne" },
        { "country_id": 77, "state_name": "Vosges" },
        { "country_id": 77, "state_name": "Yonne" },
        { "country_id": 77, "state_name": "Yvelines" }
      ]
    },
    {
      "country_id": 78,
      "country_name": "French Guiana",
      "states": [
        { "country_id": 78, "state_name": "Cayenne" },
        { "country_id": 78, "state_name": "Saint-Laurent-du-Maroni" }
      ]
    },
    {
      "country_id": 79,
      "country_name": "French Polynesia",
      "states": [
        { "country_id": 79, "state_name": "Iles du Vent" },
        { "country_id": 79, "state_name": "Iles sous le Vent" },
        { "country_id": 79, "state_name": "Marquesas" },
        { "country_id": 79, "state_name": "Tuamotu" },
        { "country_id": 79, "state_name": "Tubuai" }
      ]
    },
    {
      "country_id": 80,
      "country_name": "French Southern Territories",
      "states": [
        { "country_id": 80, "state_name": "Amsterdam" },
        { "country_id": 80, "state_name": "Crozet Islands" },
        { "country_id": 80, "state_name": "Kerguelen" }
      ]
    },
    {
      "country_id": 81,
      "country_name": "Gabon",
      "states": [
        { "country_id": 81, "state_name": "Estuaire" },
        { "country_id": 81, "state_name": "Haut-Ogooue" },
        { "country_id": 81, "state_name": "Moyen-Ogooue" },
        { "country_id": 81, "state_name": "Ngounie" },
        { "country_id": 81, "state_name": "Nyanga" },
        { "country_id": 81, "state_name": "Ogooue-Ivindo" },
        { "country_id": 81, "state_name": "Ogooue-Lolo" },
        { "country_id": 81, "state_name": "Ogooue-Maritime" },
        { "country_id": 81, "state_name": "Woleu-Ntem" }
      ]
    },
    {
      "country_id": 82,
      "country_name": "Gambia The",
      "states": [
        { "country_id": 82, "state_name": "Banjul" },
        { "country_id": 82, "state_name": "Basse" },
        { "country_id": 82, "state_name": "Brikama" },
        { "country_id": 82, "state_name": "Janjanbureh" },
        { "country_id": 82, "state_name": "Kanifing" },
        { "country_id": 82, "state_name": "Kerewan" },
        { "country_id": 82, "state_name": "Kuntaur" },
        { "country_id": 82, "state_name": "Mansakonko" }
      ]
    },
    {
      "country_id": 83,
      "country_name": "Georgia",
      "states": [
        { "country_id": 83, "state_name": "Abhasia" },
        { "country_id": 83, "state_name": "Ajaria" },
        { "country_id": 83, "state_name": "Guria" },
        { "country_id": 83, "state_name": "Imereti" },
        { "country_id": 83, "state_name": "Kaheti" },
        { "country_id": 83, "state_name": "Kvemo Kartli" },
        { "country_id": 83, "state_name": "Mcheta-Mtianeti" },
        { "country_id": 83, "state_name": "Racha" },
        { "country_id": 83, "state_name": "Samagrelo-Zemo Svaneti" },
        { "country_id": 83, "state_name": "Samche-Zhavaheti" },
        { "country_id": 83, "state_name": "Shida Kartli" },
        { "country_id": 83, "state_name": "Tbilisi" }
      ]
    },
    {
      "country_id": 84,
      "country_name": "Germany",
      "states": [
        { "country_id": 84, "state_name": "Auvergne" },
        { "country_id": 84, "state_name": "Baden-Wurttemberg" },
        { "country_id": 84, "state_name": "Bavaria" },
        { "country_id": 84, "state_name": "Bayern" },
        { "country_id": 84, "state_name": "Beilstein Wurtt" },
        { "country_id": 84, "state_name": "Berlin" },
        { "country_id": 84, "state_name": "Brandenburg" },
        { "country_id": 84, "state_name": "Bremen" },
        { "country_id": 84, "state_name": "Dreisbach" },
        { "country_id": 84, "state_name": "Freistaat Bayern" },
        { "country_id": 84, "state_name": "Hamburg" },
        { "country_id": 84, "state_name": "Hannover" },
        { "country_id": 84, "state_name": "Heroldstatt" },
        { "country_id": 84, "state_name": "Hessen" },
        { "country_id": 84, "state_name": "Kortenberg" },
        { "country_id": 84, "state_name": "Laasdorf" },
        { "country_id": 84, "state_name": "Land Baden-Wurttemberg" },
        { "country_id": 84, "state_name": "Land Bayern" },
        { "country_id": 84, "state_name": "Land Brandenburg" },
        { "country_id": 84, "state_name": "Land Hessen" },
        { "country_id": 84, "state_name": "Land Mecklenburg-Vorpommern" },
        { "country_id": 84, "state_name": "Land Nordrhein-Westfalen" },
        { "country_id": 84, "state_name": "Land Rheinland-Pfalz" },
        { "country_id": 84, "state_name": "Land Sachsen" },
        { "country_id": 84, "state_name": "Land Sachsen-Anhalt" },
        { "country_id": 84, "state_name": "Land Thuringen" },
        { "country_id": 84, "state_name": "Lower Saxony" },
        { "country_id": 84, "state_name": "Mecklenburg-Vorpommern" },
        { "country_id": 84, "state_name": "Mulfingen" },
        { "country_id": 84, "state_name": "Munich" },
        { "country_id": 84, "state_name": "Neubeuern" },
        { "country_id": 84, "state_name": "Niedersachsen" },
        { "country_id": 84, "state_name": "Noord-Holland" },
        { "country_id": 84, "state_name": "Nordrhein-Westfalen" },
        { "country_id": 84, "state_name": "North Rhine-Westphalia" },
        { "country_id": 84, "state_name": "Osterode" },
        { "country_id": 84, "state_name": "Rheinland-Pfalz" },
        { "country_id": 84, "state_name": "Rhineland-Palatinate" },
        { "country_id": 84, "state_name": "Saarland" },
        { "country_id": 84, "state_name": "Sachsen" },
        { "country_id": 84, "state_name": "Sachsen-Anhalt" },
        { "country_id": 84, "state_name": "Saxony" },
        { "country_id": 84, "state_name": "Schleswig-Holstein" },
        { "country_id": 84, "state_name": "Thuringia" },
        { "country_id": 84, "state_name": "Webling" },
        { "country_id": 84, "state_name": "Weinstrabe" },
        { "country_id": 84, "state_name": "schlobborn" }
      ]
    },
    {
      "country_id": 85,
      "country_name": "Ghana",
      "states": [
        { "country_id": 85, "state_name": "Ashanti" },
        { "country_id": 85, "state_name": "Brong-Ahafo" },
        { "country_id": 85, "state_name": "Central" },
        { "country_id": 85, "state_name": "Eastern" },
        { "country_id": 85, "state_name": "Greater Accra" },
        { "country_id": 85, "state_name": "Northern" },
        { "country_id": 85, "state_name": "Upper East" },
        { "country_id": 85, "state_name": "Upper West" },
        { "country_id": 85, "state_name": "Volta" },
        { "country_id": 85, "state_name": "Western" }
      ]
    },
    {
      "country_id": 86,
      "country_name": "Gibraltar",
      "states": [{ "country_id": 86, "state_name": "Gibraltar" }]
    },
    {
      "country_id": 87,
      "country_name": "Greece",
      "states": [
        { "country_id": 87, "state_name": "Acharnes" },
        { "country_id": 87, "state_name": "Ahaia" },
        { "country_id": 87, "state_name": "Aitolia kai Akarnania" },
        { "country_id": 87, "state_name": "Argolis" },
        { "country_id": 87, "state_name": "Arkadia" },
        { "country_id": 87, "state_name": "Arta" },
        { "country_id": 87, "state_name": "Attica" },
        { "country_id": 87, "state_name": "Attiki" },
        { "country_id": 87, "state_name": "Ayion Oros" },
        { "country_id": 87, "state_name": "Crete" },
        { "country_id": 87, "state_name": "Dodekanisos" },
        { "country_id": 87, "state_name": "Drama" },
        { "country_id": 87, "state_name": "Evia" },
        { "country_id": 87, "state_name": "Evritania" },
        { "country_id": 87, "state_name": "Evros" },
        { "country_id": 87, "state_name": "Evvoia" },
        { "country_id": 87, "state_name": "Florina" },
        { "country_id": 87, "state_name": "Fokis" },
        { "country_id": 87, "state_name": "Fthiotis" },
        { "country_id": 87, "state_name": "Grevena" },
        { "country_id": 87, "state_name": "Halandri" },
        { "country_id": 87, "state_name": "Halkidiki" },
        { "country_id": 87, "state_name": "Hania" },
        { "country_id": 87, "state_name": "Heraklion" },
        { "country_id": 87, "state_name": "Hios" },
        { "country_id": 87, "state_name": "Ilia" },
        { "country_id": 87, "state_name": "Imathia" },
        { "country_id": 87, "state_name": "Ioannina" },
        { "country_id": 87, "state_name": "Iraklion" },
        { "country_id": 87, "state_name": "Karditsa" },
        { "country_id": 87, "state_name": "Kastoria" },
        { "country_id": 87, "state_name": "Kavala" },
        { "country_id": 87, "state_name": "Kefallinia" },
        { "country_id": 87, "state_name": "Kerkira" },
        { "country_id": 87, "state_name": "Kiklades" },
        { "country_id": 87, "state_name": "Kilkis" },
        { "country_id": 87, "state_name": "Korinthia" },
        { "country_id": 87, "state_name": "Kozani" },
        { "country_id": 87, "state_name": "Lakonia" },
        { "country_id": 87, "state_name": "Larisa" },
        { "country_id": 87, "state_name": "Lasithi" },
        { "country_id": 87, "state_name": "Lesvos" },
        { "country_id": 87, "state_name": "Levkas" },
        { "country_id": 87, "state_name": "Magnisia" },
        { "country_id": 87, "state_name": "Messinia" },
        { "country_id": 87, "state_name": "Nomos Attikis" },
        { "country_id": 87, "state_name": "Nomos Zakynthou" },
        { "country_id": 87, "state_name": "Pella" },
        { "country_id": 87, "state_name": "Pieria" },
        { "country_id": 87, "state_name": "Piraios" },
        { "country_id": 87, "state_name": "Preveza" },
        { "country_id": 87, "state_name": "Rethimni" },
        { "country_id": 87, "state_name": "Rodopi" },
        { "country_id": 87, "state_name": "Samos" },
        { "country_id": 87, "state_name": "Serrai" },
        { "country_id": 87, "state_name": "Thesprotia" },
        { "country_id": 87, "state_name": "Thessaloniki" },
        { "country_id": 87, "state_name": "Trikala" },
        { "country_id": 87, "state_name": "Voiotia" },
        { "country_id": 87, "state_name": "West Greece" },
        { "country_id": 87, "state_name": "Xanthi" },
        { "country_id": 87, "state_name": "Zakinthos" }
      ]
    },
    {
      "country_id": 88,
      "country_name": "Greenland",
      "states": [
        { "country_id": 88, "state_name": "Aasiaat" },
        { "country_id": 88, "state_name": "Ammassalik" },
        { "country_id": 88, "state_name": "Illoqqortoormiut" },
        { "country_id": 88, "state_name": "Ilulissat" },
        { "country_id": 88, "state_name": "Ivittuut" },
        { "country_id": 88, "state_name": "Kangaatsiaq" },
        { "country_id": 88, "state_name": "Maniitsoq" },
        { "country_id": 88, "state_name": "Nanortalik" },
        { "country_id": 88, "state_name": "Narsaq" },
        { "country_id": 88, "state_name": "Nuuk" },
        { "country_id": 88, "state_name": "Paamiut" },
        { "country_id": 88, "state_name": "Qaanaaq" },
        { "country_id": 88, "state_name": "Qaqortoq" },
        { "country_id": 88, "state_name": "Qasigiannguit" },
        { "country_id": 88, "state_name": "Qeqertarsuaq" },
        { "country_id": 88, "state_name": "Sisimiut" },
        { "country_id": 88, "state_name": "Udenfor kommunal inddeling" },
        { "country_id": 88, "state_name": "Upernavik" },
        { "country_id": 88, "state_name": "Uummannaq" }
      ]
    },
    {
      "country_id": 89,
      "country_name": "Grenada",
      "states": [
        { "country_id": 89, "state_name": "Carriacou-Petite Martinique" },
        { "country_id": 89, "state_name": "Saint Andrew" },
        { "country_id": 89, "state_name": "Saint Davids" },
        { "country_id": 89, "state_name": "Saint George's" },
        { "country_id": 89, "state_name": "Saint John" },
        { "country_id": 89, "state_name": "Saint Mark" },
        { "country_id": 89, "state_name": "Saint Patrick" }
      ]
    },
    {
      "country_id": 90,
      "country_name": "Guadeloupe",
      "states": [
        { "country_id": 90, "state_name": "Basse-Terre" },
        { "country_id": 90, "state_name": "Grande-Terre" },
        { "country_id": 90, "state_name": "Iles des Saintes" },
        { "country_id": 90, "state_name": "La Desirade" },
        { "country_id": 90, "state_name": "Marie-Galante" },
        { "country_id": 90, "state_name": "Saint Barthelemy" },
        { "country_id": 90, "state_name": "Saint Martin" }
      ]
    },
    {
      "country_id": 91,
      "country_name": "Guam",
      "states": [
        { "country_id": 91, "state_name": "Agana Heights" },
        { "country_id": 91, "state_name": "Agat" },
        { "country_id": 91, "state_name": "Barrigada" },
        { "country_id": 91, "state_name": "Chalan-Pago-Ordot" },
        { "country_id": 91, "state_name": "Dededo" },
        { "country_id": 91, "state_name": "Hagatna" },
        { "country_id": 91, "state_name": "Inarajan" },
        { "country_id": 91, "state_name": "Mangilao" },
        { "country_id": 91, "state_name": "Merizo" },
        { "country_id": 91, "state_name": "Mongmong-Toto-Maite" },
        { "country_id": 91, "state_name": "Santa Rita" },
        { "country_id": 91, "state_name": "Sinajana" },
        { "country_id": 91, "state_name": "Talofofo" },
        { "country_id": 91, "state_name": "Tamuning" },
        { "country_id": 91, "state_name": "Yigo" },
        { "country_id": 91, "state_name": "Yona" }
      ]
    },
    {
      "country_id": 92,
      "country_name": "Guatemala",
      "states": [
        { "country_id": 92, "state_name": "Alta Verapaz" },
        { "country_id": 92, "state_name": "Baja Verapaz" },
        { "country_id": 92, "state_name": "Chimaltenango" },
        { "country_id": 92, "state_name": "Chiquimula" },
        { "country_id": 92, "state_name": "El Progreso" },
        { "country_id": 92, "state_name": "Escuintla" },
        { "country_id": 92, "state_name": "Guatemala" },
        { "country_id": 92, "state_name": "Huehuetenango" },
        { "country_id": 92, "state_name": "Izabal" },
        { "country_id": 92, "state_name": "Jalapa" },
        { "country_id": 92, "state_name": "Jutiapa" },
        { "country_id": 92, "state_name": "Peten" },
        { "country_id": 92, "state_name": "Quezaltenango" },
        { "country_id": 92, "state_name": "Quiche" },
        { "country_id": 92, "state_name": "Retalhuleu" },
        { "country_id": 92, "state_name": "Sacatepequez" },
        { "country_id": 92, "state_name": "San Marcos" },
        { "country_id": 92, "state_name": "Santa Rosa" },
        { "country_id": 92, "state_name": "Solola" },
        { "country_id": 92, "state_name": "Suchitepequez" },
        { "country_id": 92, "state_name": "Totonicapan" },
        { "country_id": 92, "state_name": "Zacapa" }
      ]
    },
    {
      "country_id": 93,
      "country_name": "Guernsey and Alderney",
      "states": [
        { "country_id": 93, "state_name": "Alderney" },
        { "country_id": 93, "state_name": "Castel" },
        { "country_id": 93, "state_name": "Forest" },
        { "country_id": 93, "state_name": "Saint Andrew" },
        { "country_id": 93, "state_name": "Saint Martin" },
        { "country_id": 93, "state_name": "Saint Peter Port" },
        { "country_id": 93, "state_name": "Saint Pierre du Bois" },
        { "country_id": 93, "state_name": "Saint Sampson" },
        { "country_id": 93, "state_name": "Saint Saviour" },
        { "country_id": 93, "state_name": "Sark" },
        { "country_id": 93, "state_name": "Torteval" },
        { "country_id": 93, "state_name": "Vale" }
      ]
    },
    {
      "country_id": 94,
      "country_name": "Guinea",
      "states": [
        { "country_id": 94, "state_name": "Beyla" },
        { "country_id": 94, "state_name": "Boffa" },
        { "country_id": 94, "state_name": "Boke" },
        { "country_id": 94, "state_name": "Conakry" },
        { "country_id": 94, "state_name": "Coyah" },
        { "country_id": 94, "state_name": "Dabola" },
        { "country_id": 94, "state_name": "Dalaba" },
        { "country_id": 94, "state_name": "Dinguiraye" },
        { "country_id": 94, "state_name": "Faranah" },
        { "country_id": 94, "state_name": "Forecariah" },
        { "country_id": 94, "state_name": "Fria" },
        { "country_id": 94, "state_name": "Gaoual" },
        { "country_id": 94, "state_name": "Gueckedou" },
        { "country_id": 94, "state_name": "Kankan" },
        { "country_id": 94, "state_name": "Kerouane" },
        { "country_id": 94, "state_name": "Kindia" },
        { "country_id": 94, "state_name": "Kissidougou" },
        { "country_id": 94, "state_name": "Koubia" },
        { "country_id": 94, "state_name": "Koundara" },
        { "country_id": 94, "state_name": "Kouroussa" },
        { "country_id": 94, "state_name": "Labe" },
        { "country_id": 94, "state_name": "Lola" },
        { "country_id": 94, "state_name": "Macenta" },
        { "country_id": 94, "state_name": "Mali" },
        { "country_id": 94, "state_name": "Mamou" },
        { "country_id": 94, "state_name": "Mandiana" },
        { "country_id": 94, "state_name": "Nzerekore" },
        { "country_id": 94, "state_name": "Pita" },
        { "country_id": 94, "state_name": "Siguiri" },
        { "country_id": 94, "state_name": "Telimele" },
        { "country_id": 94, "state_name": "Tougue" },
        { "country_id": 94, "state_name": "Yomou" }
      ]
    },
    {
      "country_id": 95,
      "country_name": "Guinea-Bissau",
      "states": [
        { "country_id": 95, "state_name": "Bafata" },
        { "country_id": 95, "state_name": "Bissau" },
        { "country_id": 95, "state_name": "Bolama" },
        { "country_id": 95, "state_name": "Cacheu" },
        { "country_id": 95, "state_name": "Gabu" },
        { "country_id": 95, "state_name": "Oio" },
        { "country_id": 95, "state_name": "Quinara" },
        { "country_id": 95, "state_name": "Tombali" }
      ]
    },
    {
      "country_id": 96,
      "country_name": "Guyana",
      "states": [
        { "country_id": 96, "state_name": "Barima-Waini" },
        { "country_id": 96, "state_name": "Cuyuni-Mazaruni" },
        { "country_id": 96, "state_name": "Demerara-Mahaica" },
        { "country_id": 96, "state_name": "East Berbice-Corentyne" },
        { "country_id": 96, "state_name": "Essequibo Islands-West Demerar" },
        { "country_id": 96, "state_name": "Mahaica-Berbice" },
        { "country_id": 96, "state_name": "Pomeroon-Supenaam" },
        { "country_id": 96, "state_name": "Potaro-Siparuni" },
        { "country_id": 96, "state_name": "Upper Demerara-Berbice" },
        { "country_id": 96, "state_name": "Upper Takutu-Upper Essequibo" }
      ]
    },
    {
      "country_id": 97,
      "country_name": "Haiti",
      "states": [
        { "country_id": 97, "state_name": "Artibonite" },
        { "country_id": 97, "state_name": "Centre" },
        { "country_id": 97, "state_name": "Grand'Anse" },
        { "country_id": 97, "state_name": "Nord" },
        { "country_id": 97, "state_name": "Nord-Est" },
        { "country_id": 97, "state_name": "Nord-Ouest" },
        { "country_id": 97, "state_name": "Ouest" },
        { "country_id": 97, "state_name": "Sud" },
        { "country_id": 97, "state_name": "Sud-Est" }
      ]
    },
    {
      "country_id": 98,
      "country_name": "Heard and McDonald Islands",
      "states": [{ "country_id": 98, "state_name": "Heard and McDonald Islands" }]
    },
    {
      "country_id": 99,
      "country_name": "Honduras",
      "states": [
        { "country_id": 99, "state_name": "Atlantida" },
        { "country_id": 99, "state_name": "Choluteca" },
        { "country_id": 99, "state_name": "Colon" },
        { "country_id": 99, "state_name": "Comayagua" },
        { "country_id": 99, "state_name": "Copan" },
        { "country_id": 99, "state_name": "Cortes" },
        { "country_id": 99, "state_name": "Distrito Central" },
        { "country_id": 99, "state_name": "El Paraiso" },
        { "country_id": 99, "state_name": "Francisco Morazan" },
        { "country_id": 99, "state_name": "Gracias a Dios" },
        { "country_id": 99, "state_name": "Intibuca" },
        { "country_id": 99, "state_name": "Islas de la Bahia" },
        { "country_id": 99, "state_name": "La Paz" },
        { "country_id": 99, "state_name": "Lempira" },
        { "country_id": 99, "state_name": "Ocotepeque" },
        { "country_id": 99, "state_name": "Olancho" },
        { "country_id": 99, "state_name": "Santa Barbara" },
        { "country_id": 99, "state_name": "Valle" },
        { "country_id": 99, "state_name": "Yoro" }
      ]
    },
    {
      "country_id": 100,
      "country_name": "Hong Kong S.A.R.",
      "states": [{ "country_id": 100, "state_name": "Hong Kong" }]
    },
    {
      "country_id": 101,
      "country_name": "Hungary",
      "states": [
        { "country_id": 101, "state_name": "Bacs-Kiskun" },
        { "country_id": 101, "state_name": "Baranya" },
        { "country_id": 101, "state_name": "Bekes" },
        { "country_id": 101, "state_name": "Borsod-Abauj-Zemplen" },
        { "country_id": 101, "state_name": "Budapest" },
        { "country_id": 101, "state_name": "Csongrad" },
        { "country_id": 101, "state_name": "Fejer" },
        { "country_id": 101, "state_name": "Gyor-Moson-Sopron" },
        { "country_id": 101, "state_name": "Hajdu-Bihar" },
        { "country_id": 101, "state_name": "Heves" },
        { "country_id": 101, "state_name": "Jasz-Nagykun-Szolnok" },
        { "country_id": 101, "state_name": "Komarom-Esztergom" },
        { "country_id": 101, "state_name": "Nograd" },
        { "country_id": 101, "state_name": "Pest" },
        { "country_id": 101, "state_name": "Somogy" },
        { "country_id": 101, "state_name": "Szabolcs-Szatmar-Bereg" },
        { "country_id": 101, "state_name": "Tolna" },
        { "country_id": 101, "state_name": "Vas" },
        { "country_id": 101, "state_name": "Veszprem" },
        { "country_id": 101, "state_name": "Zala" }
      ]
    },
    {
      "country_id": 102,
      "country_name": "Iceland",
      "states": [
        { "country_id": 102, "state_name": "Austurland" },
        { "country_id": 102, "state_name": "Gullbringusysla" },
        { "country_id": 102, "state_name": "Hofu borgarsva i" },
        { "country_id": 102, "state_name": "Nor urland eystra" },
        { "country_id": 102, "state_name": "Nor urland vestra" },
        { "country_id": 102, "state_name": "Su urland" },
        { "country_id": 102, "state_name": "Su urnes" },
        { "country_id": 102, "state_name": "Vestfir ir" },
        { "country_id": 102, "state_name": "Vesturland" }
      ]
    },
    {
      "country_id": 103,
      "country_name": "India",
      "states": [
        { "country_id": 103, "state_name": "Andaman and Nicobar Islands" },
        { "country_id": 103, "state_name": "Andhra Pradesh" },
        { "country_id": 103, "state_name": "Arunachal Pradesh" },
        { "country_id": 103, "state_name": "Assam" },
        { "country_id": 103, "state_name": "Bihar" },
        { "country_id": 103, "state_name": "Chandigarh" },
        { "country_id": 103, "state_name": "Chhattisgarh" },
        { "country_id": 103, "state_name": "Dadra and Nagar Haveli" },
        { "country_id": 103, "state_name": "Daman and Diu" },
        { "country_id": 103, "state_name": "Delhi" },
        { "country_id": 103, "state_name": "Goa" },
        { "country_id": 103, "state_name": "Gujarat" },
        { "country_id": 103, "state_name": "Haryana" },
        { "country_id": 103, "state_name": "Himachal Pradesh" },
        { "country_id": 103, "state_name": "Jammu and Kashmir" },
        { "country_id": 103, "state_name": "Jharkhand" },
        { "country_id": 103, "state_name": "Karnataka" },
        { "country_id": 103, "state_name": "Kenmore" },
        { "country_id": 103, "state_name": "Kerala" },
        { "country_id": 103, "state_name": "Lakshadweep" },
        { "country_id": 103, "state_name": "Madhya Pradesh" },
        { "country_id": 103, "state_name": "Maharashtra" },
        { "country_id": 103, "state_name": "Manipur" },
        { "country_id": 103, "state_name": "Meghalaya" },
        { "country_id": 103, "state_name": "Mizoram" },
        { "country_id": 103, "state_name": "Nagaland" },
        { "country_id": 103, "state_name": "Narora" },
        { "country_id": 103, "state_name": "Natwar" },
        { "country_id": 103, "state_name": "Odisha" },
        { "country_id": 103, "state_name": "Paschim Medinipur" },
        { "country_id": 103, "state_name": "Pondicherry" },
        { "country_id": 103, "state_name": "Punjab" },
        { "country_id": 103, "state_name": "Rajasthan" },
        { "country_id": 103, "state_name": "Sikkim" },
        { "country_id": 103, "state_name": "Tamil Nadu" },
        { "country_id": 103, "state_name": "Telangana" },
        { "country_id": 103, "state_name": "Tripura" },
        { "country_id": 103, "state_name": "Uttar Pradesh" },
        { "country_id": 103, "state_name": "Uttarakhand" },
        { "country_id": 103, "state_name": "Vaishali" },
        { "country_id": 103, "state_name": "West Bengal" }
      ]
    },
    {
      "country_id": 104,
      "country_name": "Indonesia",
      "states": [
        { "country_id": 104, "state_name": "Aceh" },
        { "country_id": 104, "state_name": "Bali" },
        { "country_id": 104, "state_name": "Bangka-Belitung" },
        { "country_id": 104, "state_name": "Banten" },
        { "country_id": 104, "state_name": "Bengkulu" },
        { "country_id": 104, "state_name": "Gandaria" },
        { "country_id": 104, "state_name": "Gorontalo" },
        { "country_id": 104, "state_name": "Jakarta" },
        { "country_id": 104, "state_name": "Jambi" },
        { "country_id": 104, "state_name": "Jawa Barat" },
        { "country_id": 104, "state_name": "Jawa Tengah" },
        { "country_id": 104, "state_name": "Jawa Timur" },
        { "country_id": 104, "state_name": "Kalimantan Barat" },
        { "country_id": 104, "state_name": "Kalimantan Selatan" },
        { "country_id": 104, "state_name": "Kalimantan Tengah" },
        { "country_id": 104, "state_name": "Kalimantan Timur" },
        { "country_id": 104, "state_name": "Kendal" },
        { "country_id": 104, "state_name": "Lampung" },
        { "country_id": 104, "state_name": "Maluku" },
        { "country_id": 104, "state_name": "Maluku Utara" },
        { "country_id": 104, "state_name": "Nusa Tenggara Barat" },
        { "country_id": 104, "state_name": "Nusa Tenggara Timur" },
        { "country_id": 104, "state_name": "Papua" },
        { "country_id": 104, "state_name": "Riau" },
        { "country_id": 104, "state_name": "Riau Kepulauan" },
        { "country_id": 104, "state_name": "Solo" },
        { "country_id": 104, "state_name": "Sulawesi Selatan" },
        { "country_id": 104, "state_name": "Sulawesi Tengah" },
        { "country_id": 104, "state_name": "Sulawesi Tenggara" },
        { "country_id": 104, "state_name": "Sulawesi Utara" },
        { "country_id": 104, "state_name": "Sumatera Barat" },
        { "country_id": 104, "state_name": "Sumatera Selatan" },
        { "country_id": 104, "state_name": "Sumatera Utara" },
        { "country_id": 104, "state_name": "Yogyakarta" }
      ]
    },
    {
      "country_id": 105,
      "country_name": "Iran",
      "states": [
        { "country_id": 105, "state_name": "Ardabil" },
        { "country_id": 105, "state_name": "Azarbayjan-e Bakhtari" },
        { "country_id": 105, "state_name": "Azarbayjan-e Khavari" },
        { "country_id": 105, "state_name": "Bushehr" },
        { "country_id": 105, "state_name": "Chahar Mahal-e Bakhtiari" },
        { "country_id": 105, "state_name": "Esfahan" },
        { "country_id": 105, "state_name": "Fars" },
        { "country_id": 105, "state_name": "Gilan" },
        { "country_id": 105, "state_name": "Golestan" },
        { "country_id": 105, "state_name": "Hamadan" },
        { "country_id": 105, "state_name": "Hormozgan" },
        { "country_id": 105, "state_name": "Ilam" },
        { "country_id": 105, "state_name": "Kerman" },
        { "country_id": 105, "state_name": "Kermanshah" },
        { "country_id": 105, "state_name": "Khorasan" },
        { "country_id": 105, "state_name": "Khuzestan" },
        { "country_id": 105, "state_name": "Kohgiluyeh-e Boyerahmad" },
        { "country_id": 105, "state_name": "Kordestan" },
        { "country_id": 105, "state_name": "Lorestan" },
        { "country_id": 105, "state_name": "Markazi" },
        { "country_id": 105, "state_name": "Mazandaran" },
        { "country_id": 105, "state_name": "Ostan-e Esfahan" },
        { "country_id": 105, "state_name": "Qazvin" },
        { "country_id": 105, "state_name": "Qom" },
        { "country_id": 105, "state_name": "Semnan" },
        { "country_id": 105, "state_name": "Sistan-e Baluchestan" },
        { "country_id": 105, "state_name": "Tehran" },
        { "country_id": 105, "state_name": "Yazd" },
        { "country_id": 105, "state_name": "Zanjan" }
      ]
    },
    {
      "country_id": 106,
      "country_name": "Iraq",
      "states": [
        { "country_id": 106, "state_name": "Babil" },
        { "country_id": 106, "state_name": "Baghdad" },
        { "country_id": 106, "state_name": "Dahuk" },
        { "country_id": 106, "state_name": "Dhi Qar" },
        { "country_id": 106, "state_name": "Diyala" },
        { "country_id": 106, "state_name": "Erbil" },
        { "country_id": 106, "state_name": "Irbil" },
        { "country_id": 106, "state_name": "Karbala" },
        { "country_id": 106, "state_name": "Kurdistan" },
        { "country_id": 106, "state_name": "Maysan" },
        { "country_id": 106, "state_name": "Ninawa" },
        { "country_id": 106, "state_name": "Salah-ad-Din" },
        { "country_id": 106, "state_name": "Wasit" },
        { "country_id": 106, "state_name": "al-Anbar" },
        { "country_id": 106, "state_name": "al-Basrah" },
        { "country_id": 106, "state_name": "al-Muthanna" },
        { "country_id": 106, "state_name": "al-Qadisiyah" },
        { "country_id": 106, "state_name": "an-Najaf" },
        { "country_id": 106, "state_name": "as-Sulaymaniyah" },
        { "country_id": 106, "state_name": "at-Ta'mim'" }
      ]
    },
    {
      "country_id": 107,
      "country_name": "Ireland",
      "states": [
        { "country_id": 107, "state_name": "Armagh" },
        { "country_id": 107, "state_name": "Carlow" },
        { "country_id": 107, "state_name": "Cavan" },
        { "country_id": 107, "state_name": "Clare" },
        { "country_id": 107, "state_name": "Cork" },
        { "country_id": 107, "state_name": "Donegal" },
        { "country_id": 107, "state_name": "Dublin" },
        { "country_id": 107, "state_name": "Galway" },
        { "country_id": 107, "state_name": "Kerry" },
        { "country_id": 107, "state_name": "Kildare" },
        { "country_id": 107, "state_name": "Kilkenny" },
        { "country_id": 107, "state_name": "Laois" },
        { "country_id": 107, "state_name": "Leinster" },
        { "country_id": 107, "state_name": "Leitrim" },
        { "country_id": 107, "state_name": "Limerick" },
        { "country_id": 107, "state_name": "Loch Garman" },
        { "country_id": 107, "state_name": "Longford" },
        { "country_id": 107, "state_name": "Louth" },
        { "country_id": 107, "state_name": "Mayo" },
        { "country_id": 107, "state_name": "Meath" },
        { "country_id": 107, "state_name": "Monaghan" },
        { "country_id": 107, "state_name": "Offaly" },
        { "country_id": 107, "state_name": "Roscommon" },
        { "country_id": 107, "state_name": "Sligo" },
        { "country_id": 107, "state_name": "Tipperary North Riding" },
        { "country_id": 107, "state_name": "Tipperary South Riding" },
        { "country_id": 107, "state_name": "Ulster" },
        { "country_id": 107, "state_name": "Waterford" },
        { "country_id": 107, "state_name": "Westmeath" },
        { "country_id": 107, "state_name": "Wexford" },
        { "country_id": 107, "state_name": "Wicklow" }
      ]
    },
    {
      "country_id": 108,
      "country_name": "Israel",
      "states": [
        { "country_id": 108, "state_name": "Beit Hanania" },
        { "country_id": 108, "state_name": "Ben Gurion Airport" },
        { "country_id": 108, "state_name": "Bethlehem" },
        { "country_id": 108, "state_name": "Caesarea" },
        { "country_id": 108, "state_name": "Centre" },
        { "country_id": 108, "state_name": "Gaza" },
        { "country_id": 108, "state_name": "Hadaron" },
        { "country_id": 108, "state_name": "Haifa District" },
        { "country_id": 108, "state_name": "Hamerkaz" },
        { "country_id": 108, "state_name": "Hazafon" },
        { "country_id": 108, "state_name": "Hebron" },
        { "country_id": 108, "state_name": "Jaffa" },
        { "country_id": 108, "state_name": "Jerusalem" },
        { "country_id": 108, "state_name": "Khefa" },
        { "country_id": 108, "state_name": "Kiryat Yam" },
        { "country_id": 108, "state_name": "Lower Galilee" },
        { "country_id": 108, "state_name": "Qalqilya" },
        { "country_id": 108, "state_name": "Talme Elazar" },
        { "country_id": 108, "state_name": "Tel Aviv" },
        { "country_id": 108, "state_name": "Tsafon" },
        { "country_id": 108, "state_name": "Umm El Fahem" },
        { "country_id": 108, "state_name": "Yerushalayim" }
      ]
    },
    {
      "country_id": 109,
      "country_name": "Italy",
      "states": [
        { "country_id": 109, "state_name": "Abruzzi" },
        { "country_id": 109, "state_name": "Abruzzo" },
        { "country_id": 109, "state_name": "Agrigento" },
        { "country_id": 109, "state_name": "Alessandria" },
        { "country_id": 109, "state_name": "Ancona" },
        { "country_id": 109, "state_name": "Arezzo" },
        { "country_id": 109, "state_name": "Ascoli Piceno" },
        { "country_id": 109, "state_name": "Asti" },
        { "country_id": 109, "state_name": "Avellino" },
        { "country_id": 109, "state_name": "Bari" },
        { "country_id": 109, "state_name": "Basilicata" },
        { "country_id": 109, "state_name": "Belluno" },
        { "country_id": 109, "state_name": "Benevento" },
        { "country_id": 109, "state_name": "Bergamo" },
        { "country_id": 109, "state_name": "Biella" },
        { "country_id": 109, "state_name": "Bologna" },
        { "country_id": 109, "state_name": "Bolzano" },
        { "country_id": 109, "state_name": "Brescia" },
        { "country_id": 109, "state_name": "Brindisi" },
        { "country_id": 109, "state_name": "Calabria" },
        { "country_id": 109, "state_name": "Campania" },
        { "country_id": 109, "state_name": "Cartoceto" },
        { "country_id": 109, "state_name": "Caserta" },
        { "country_id": 109, "state_name": "Catania" },
        { "country_id": 109, "state_name": "Chieti" },
        { "country_id": 109, "state_name": "Como" },
        { "country_id": 109, "state_name": "Cosenza" },
        { "country_id": 109, "state_name": "Cremona" },
        { "country_id": 109, "state_name": "Cuneo" },
        { "country_id": 109, "state_name": "Emilia-Romagna" },
        { "country_id": 109, "state_name": "Ferrara" },
        { "country_id": 109, "state_name": "Firenze" },
        { "country_id": 109, "state_name": "Florence" },
        { "country_id": 109, "state_name": "Forli-Cesena " },
        { "country_id": 109, "state_name": "Friuli-Venezia Giulia" },
        { "country_id": 109, "state_name": "Frosinone" },
        { "country_id": 109, "state_name": "Genoa" },
        { "country_id": 109, "state_name": "Gorizia" },
        { "country_id": 109, "state_name": "L'Aquila" },
        { "country_id": 109, "state_name": "Lazio" },
        { "country_id": 109, "state_name": "Lecce" },
        { "country_id": 109, "state_name": "Lecco" },
        { "country_id": 109, "state_name": "Liguria" },
        { "country_id": 109, "state_name": "Lodi" },
        { "country_id": 109, "state_name": "Lombardia" },
        { "country_id": 109, "state_name": "Lombardy" },
        { "country_id": 109, "state_name": "Macerata" },
        { "country_id": 109, "state_name": "Mantova" },
        { "country_id": 109, "state_name": "Marche" },
        { "country_id": 109, "state_name": "Messina" },
        { "country_id": 109, "state_name": "Milan" },
        { "country_id": 109, "state_name": "Modena" },
        { "country_id": 109, "state_name": "Molise" },
        { "country_id": 109, "state_name": "Molteno" },
        { "country_id": 109, "state_name": "Montenegro" },
        { "country_id": 109, "state_name": "Monza and Brianza" },
        { "country_id": 109, "state_name": "Naples" },
        { "country_id": 109, "state_name": "Novara" },
        { "country_id": 109, "state_name": "Padova" },
        { "country_id": 109, "state_name": "Parma" },
        { "country_id": 109, "state_name": "Pavia" },
        { "country_id": 109, "state_name": "Perugia" },
        { "country_id": 109, "state_name": "Pesaro-Urbino" },
        { "country_id": 109, "state_name": "Piacenza" },
        { "country_id": 109, "state_name": "Piedmont" },
        { "country_id": 109, "state_name": "Piemonte" },
        { "country_id": 109, "state_name": "Pisa" },
        { "country_id": 109, "state_name": "Pordenone" },
        { "country_id": 109, "state_name": "Potenza" },
        { "country_id": 109, "state_name": "Puglia" },
        { "country_id": 109, "state_name": "Reggio Emilia" },
        { "country_id": 109, "state_name": "Rimini" },
        { "country_id": 109, "state_name": "Roma" },
        { "country_id": 109, "state_name": "Salerno" },
        { "country_id": 109, "state_name": "Sardegna" },
        { "country_id": 109, "state_name": "Sassari" },
        { "country_id": 109, "state_name": "Savona" },
        { "country_id": 109, "state_name": "Sicilia" },
        { "country_id": 109, "state_name": "Siena" },
        { "country_id": 109, "state_name": "Sondrio" },
        { "country_id": 109, "state_name": "South Tyrol" },
        { "country_id": 109, "state_name": "Taranto" },
        { "country_id": 109, "state_name": "Teramo" },
        { "country_id": 109, "state_name": "Torino" },
        { "country_id": 109, "state_name": "Toscana" },
        { "country_id": 109, "state_name": "Trapani" },
        { "country_id": 109, "state_name": "Trentino-Alto Adige" },
        { "country_id": 109, "state_name": "Trento" },
        { "country_id": 109, "state_name": "Treviso" },
        { "country_id": 109, "state_name": "Udine" },
        { "country_id": 109, "state_name": "Umbria" },
        { "country_id": 109, "state_name": "Valle d'Aosta" },
        { "country_id": 109, "state_name": "Varese" },
        { "country_id": 109, "state_name": "Veneto" },
        { "country_id": 109, "state_name": "Venezia" },
        { "country_id": 109, "state_name": "Verbano-Cusio-Ossola" },
        { "country_id": 109, "state_name": "Vercelli" },
        { "country_id": 109, "state_name": "Verona" },
        { "country_id": 109, "state_name": "Vicenza" },
        { "country_id": 109, "state_name": "Viterbo" }
      ]
    },
    {
      "country_id": 110,
      "country_name": "Jamaica",
      "states": [
        { "country_id": 110, "state_name": "Buxoro Viloyati" },
        { "country_id": 110, "state_name": "Clarendon" },
        { "country_id": 110, "state_name": "Hanover" },
        { "country_id": 110, "state_name": "Kingston" },
        { "country_id": 110, "state_name": "Manchester" },
        { "country_id": 110, "state_name": "Portland" },
        { "country_id": 110, "state_name": "Saint Andrews" },
        { "country_id": 110, "state_name": "Saint Ann" },
        { "country_id": 110, "state_name": "Saint Catherine" },
        { "country_id": 110, "state_name": "Saint Elizabeth" },
        { "country_id": 110, "state_name": "Saint James" },
        { "country_id": 110, "state_name": "Saint Mary" },
        { "country_id": 110, "state_name": "Saint Thomas" },
        { "country_id": 110, "state_name": "Trelawney" },
        { "country_id": 110, "state_name": "Westmoreland" }
      ]
    },
    {
      "country_id": 111,
      "country_name": "Japan",
      "states": [
        { "country_id": 111, "state_name": "Aichi" },
        { "country_id": 111, "state_name": "Akita" },
        { "country_id": 111, "state_name": "Aomori" },
        { "country_id": 111, "state_name": "Chiba" },
        { "country_id": 111, "state_name": "Ehime" },
        { "country_id": 111, "state_name": "Fukui" },
        { "country_id": 111, "state_name": "Fukuoka" },
        { "country_id": 111, "state_name": "Fukushima" },
        { "country_id": 111, "state_name": "Gifu" },
        { "country_id": 111, "state_name": "Gumma" },
        { "country_id": 111, "state_name": "Hiroshima" },
        { "country_id": 111, "state_name": "Hokkaido" },
        { "country_id": 111, "state_name": "Hyogo" },
        { "country_id": 111, "state_name": "Ibaraki" },
        { "country_id": 111, "state_name": "Ishikawa" },
        { "country_id": 111, "state_name": "Iwate" },
        { "country_id": 111, "state_name": "Kagawa" },
        { "country_id": 111, "state_name": "Kagoshima" },
        { "country_id": 111, "state_name": "Kanagawa" },
        { "country_id": 111, "state_name": "Kanto" },
        { "country_id": 111, "state_name": "Kochi" },
        { "country_id": 111, "state_name": "Kumamoto" },
        { "country_id": 111, "state_name": "Kyoto" },
        { "country_id": 111, "state_name": "Mie" },
        { "country_id": 111, "state_name": "Miyagi" },
        { "country_id": 111, "state_name": "Miyazaki" },
        { "country_id": 111, "state_name": "Nagano" },
        { "country_id": 111, "state_name": "Nagasaki" },
        { "country_id": 111, "state_name": "Nara" },
        { "country_id": 111, "state_name": "Niigata" },
        { "country_id": 111, "state_name": "Oita" },
        { "country_id": 111, "state_name": "Okayama" },
        { "country_id": 111, "state_name": "Okinawa" },
        { "country_id": 111, "state_name": "Osaka" },
        { "country_id": 111, "state_name": "Saga" },
        { "country_id": 111, "state_name": "Saitama" },
        { "country_id": 111, "state_name": "Shiga" },
        { "country_id": 111, "state_name": "Shimane" },
        { "country_id": 111, "state_name": "Shizuoka" },
        { "country_id": 111, "state_name": "Tochigi" },
        { "country_id": 111, "state_name": "Tokushima" },
        { "country_id": 111, "state_name": "Tokyo" },
        { "country_id": 111, "state_name": "Tottori" },
        { "country_id": 111, "state_name": "Toyama" },
        { "country_id": 111, "state_name": "Wakayama" },
        { "country_id": 111, "state_name": "Yamagata" },
        { "country_id": 111, "state_name": "Yamaguchi" },
        { "country_id": 111, "state_name": "Yamanashi" }
      ]
    },
    {
      "country_id": 112,
      "country_name": "Jersey",
      "states": [
        { "country_id": 112, "state_name": "Grouville" },
        { "country_id": 112, "state_name": "Saint Brelade" },
        { "country_id": 112, "state_name": "Saint Clement" },
        { "country_id": 112, "state_name": "Saint Helier" },
        { "country_id": 112, "state_name": "Saint John" },
        { "country_id": 112, "state_name": "Saint Lawrence" },
        { "country_id": 112, "state_name": "Saint Martin" },
        { "country_id": 112, "state_name": "Saint Mary" },
        { "country_id": 112, "state_name": "Saint Peter" },
        { "country_id": 112, "state_name": "Saint Saviour" },
        { "country_id": 112, "state_name": "Trinity" }
      ]
    },
    {
      "country_id": 113,
      "country_name": "Jordan",
      "states": [
        { "country_id": 113, "state_name": "Ajlun" },
        { "country_id": 113, "state_name": "Amman" },
        { "country_id": 113, "state_name": "Irbid" },
        { "country_id": 113, "state_name": "Jarash" },
        { "country_id": 113, "state_name": "Ma'an'" },
        { "country_id": 113, "state_name": "Madaba" },
        { "country_id": 113, "state_name": "al-'Aqabah'" },
        { "country_id": 113, "state_name": "al-Balqa" },
        { "country_id": 113, "state_name": "al-Karak" },
        { "country_id": 113, "state_name": "al-Mafraq" },
        { "country_id": 113, "state_name": "at-Tafilah" },
        { "country_id": 113, "state_name": "az-Zarqa" }
      ]
    },
    {
      "country_id": 114,
      "country_name": "Kazakhstan",
      "states": [
        { "country_id": 114, "state_name": "Akmecet" },
        { "country_id": 114, "state_name": "Akmola" },
        { "country_id": 114, "state_name": "Aktobe" },
        { "country_id": 114, "state_name": "Almati" },
        { "country_id": 114, "state_name": "Atirau" },
        { "country_id": 114, "state_name": "Batis Kazakstan" },
        { "country_id": 114, "state_name": "Burlinsky Region" },
        { "country_id": 114, "state_name": "Karagandi" },
        { "country_id": 114, "state_name": "Kostanay" },
        { "country_id": 114, "state_name": "Mankistau" },
        { "country_id": 114, "state_name": "Ontustik Kazakstan" },
        { "country_id": 114, "state_name": "Pavlodar" },
        { "country_id": 114, "state_name": "Sigis Kazakstan" },
        { "country_id": 114, "state_name": "Soltustik Kazakstan" },
        { "country_id": 114, "state_name": "Taraz" }
      ]
    },
    {
      "country_id": 115,
      "country_name": "Kenya",
      "states": [
        { "country_id": 115, "state_name": "Central" },
        { "country_id": 115, "state_name": "Coast" },
        { "country_id": 115, "state_name": "Eastern" },
        { "country_id": 115, "state_name": "Nairobi" },
        { "country_id": 115, "state_name": "North Eastern" },
        { "country_id": 115, "state_name": "Nyanza" },
        { "country_id": 115, "state_name": "Rift Valley" },
        { "country_id": 115, "state_name": "Western" }
      ]
    },
    {
      "country_id": 116,
      "country_name": "Kiribati",
      "states": [
        { "country_id": 116, "state_name": "Abaiang" },
        { "country_id": 116, "state_name": "Abemana" },
        { "country_id": 116, "state_name": "Aranuka" },
        { "country_id": 116, "state_name": "Arorae" },
        { "country_id": 116, "state_name": "Banaba" },
        { "country_id": 116, "state_name": "Beru" },
        { "country_id": 116, "state_name": "Butaritari" },
        { "country_id": 116, "state_name": "Kiritimati" },
        { "country_id": 116, "state_name": "Kuria" },
        { "country_id": 116, "state_name": "Maiana" },
        { "country_id": 116, "state_name": "Makin" },
        { "country_id": 116, "state_name": "Marakei" },
        { "country_id": 116, "state_name": "Nikunau" },
        { "country_id": 116, "state_name": "Nonouti" },
        { "country_id": 116, "state_name": "Onotoa" },
        { "country_id": 116, "state_name": "Phoenix Islands" },
        { "country_id": 116, "state_name": "Tabiteuea North" },
        { "country_id": 116, "state_name": "Tabiteuea South" },
        { "country_id": 116, "state_name": "Tabuaeran" },
        { "country_id": 116, "state_name": "Tamana" },
        { "country_id": 116, "state_name": "Tarawa North" },
        { "country_id": 116, "state_name": "Tarawa South" },
        { "country_id": 116, "state_name": "Teraina" }
      ]
    },
    {
      "country_id": 117,
      "country_name": "Korea North",
      "states": [
        { "country_id": 117, "state_name": "Chagangdo" },
        { "country_id": 117, "state_name": "Hamgyeongbukto" },
        { "country_id": 117, "state_name": "Hamgyeongnamdo" },
        { "country_id": 117, "state_name": "Hwanghaebukto" },
        { "country_id": 117, "state_name": "Hwanghaenamdo" },
        { "country_id": 117, "state_name": "Kaeseong" },
        { "country_id": 117, "state_name": "Kangweon" },
        { "country_id": 117, "state_name": "Nampo" },
        { "country_id": 117, "state_name": "Pyeonganbukto" },
        { "country_id": 117, "state_name": "Pyeongannamdo" },
        { "country_id": 117, "state_name": "Pyeongyang" },
        { "country_id": 117, "state_name": "Yanggang" }
      ]
    },
    {
      "country_id": 118,
      "country_name": "Korea South",
      "states": [
        { "country_id": 118, "state_name": "Busan" },
        { "country_id": 118, "state_name": "Cheju" },
        { "country_id": 118, "state_name": "Chollabuk" },
        { "country_id": 118, "state_name": "Chollanam" },
        { "country_id": 118, "state_name": "Chungbuk" },
        { "country_id": 118, "state_name": "Chungcheongbuk" },
        { "country_id": 118, "state_name": "Chungcheongnam" },
        { "country_id": 118, "state_name": "Chungnam" },
        { "country_id": 118, "state_name": "Daegu" },
        { "country_id": 118, "state_name": "Gangwon-do" },
        { "country_id": 118, "state_name": "Goyang-si" },
        { "country_id": 118, "state_name": "Gyeonggi-do" },
        { "country_id": 118, "state_name": "Gyeongsang " },
        { "country_id": 118, "state_name": "Gyeongsangnam-do" },
        { "country_id": 118, "state_name": "Incheon" },
        { "country_id": 118, "state_name": "Jeju-Si" },
        { "country_id": 118, "state_name": "Jeonbuk" },
        { "country_id": 118, "state_name": "Kangweon" },
        { "country_id": 118, "state_name": "Kwangju" },
        { "country_id": 118, "state_name": "Kyeonggi" },
        { "country_id": 118, "state_name": "Kyeongsangbuk" },
        { "country_id": 118, "state_name": "Kyeongsangnam" },
        { "country_id": 118, "state_name": "Kyonggi-do" },
        { "country_id": 118, "state_name": "Kyungbuk-Do" },
        { "country_id": 118, "state_name": "Kyunggi-Do" },
        { "country_id": 118, "state_name": "Kyunggi-do" },
        { "country_id": 118, "state_name": "Pusan" },
        { "country_id": 118, "state_name": "Seoul" },
        { "country_id": 118, "state_name": "Sudogwon" },
        { "country_id": 118, "state_name": "Taegu" },
        { "country_id": 118, "state_name": "Taejeon" },
        { "country_id": 118, "state_name": "Taejon-gwangyoksi" },
        { "country_id": 118, "state_name": "Ulsan" },
        { "country_id": 118, "state_name": "Wonju" },
        { "country_id": 118, "state_name": "gwangyoksi" }
      ]
    },
    {
      "country_id": 119,
      "country_name": "Kuwait",
      "states": [
        { "country_id": 119, "state_name": "Al Asimah" },
        { "country_id": 119, "state_name": "Hawalli" },
        { "country_id": 119, "state_name": "Mishref" },
        { "country_id": 119, "state_name": "Qadesiya" },
        { "country_id": 119, "state_name": "Safat" },
        { "country_id": 119, "state_name": "Salmiya" },
        { "country_id": 119, "state_name": "al-Ahmadi" },
        { "country_id": 119, "state_name": "al-Farwaniyah" },
        { "country_id": 119, "state_name": "al-Jahra" },
        { "country_id": 119, "state_name": "al-Kuwayt" }
      ]
    },
    {
      "country_id": 120,
      "country_name": "Kyrgyzstan",
      "states": [
        { "country_id": 120, "state_name": "Batken" },
        { "country_id": 120, "state_name": "Bishkek" },
        { "country_id": 120, "state_name": "Chui" },
        { "country_id": 120, "state_name": "Issyk-Kul" },
        { "country_id": 120, "state_name": "Jalal-Abad" },
        { "country_id": 120, "state_name": "Naryn" },
        { "country_id": 120, "state_name": "Osh" },
        { "country_id": 120, "state_name": "Talas" }
      ]
    },
    {
      "country_id": 121,
      "country_name": "Laos",
      "states": [
        { "country_id": 121, "state_name": "Attopu" },
        { "country_id": 121, "state_name": "Bokeo" },
        { "country_id": 121, "state_name": "Bolikhamsay" },
        { "country_id": 121, "state_name": "Champasak" },
        { "country_id": 121, "state_name": "Houaphanh" },
        { "country_id": 121, "state_name": "Khammouane" },
        { "country_id": 121, "state_name": "Luang Nam Tha" },
        { "country_id": 121, "state_name": "Luang Prabang" },
        { "country_id": 121, "state_name": "Oudomxay" },
        { "country_id": 121, "state_name": "Phongsaly" },
        { "country_id": 121, "state_name": "Saravan" },
        { "country_id": 121, "state_name": "Savannakhet" },
        { "country_id": 121, "state_name": "Sekong" },
        { "country_id": 121, "state_name": "Viangchan Prefecture" },
        { "country_id": 121, "state_name": "Viangchan Province" },
        { "country_id": 121, "state_name": "Xaignabury" },
        { "country_id": 121, "state_name": "Xiang Khuang" }
      ]
    },
    {
      "country_id": 122,
      "country_name": "Latvia",
      "states": [
        { "country_id": 122, "state_name": "Aizkraukles" },
        { "country_id": 122, "state_name": "Aluksnes" },
        { "country_id": 122, "state_name": "Balvu" },
        { "country_id": 122, "state_name": "Bauskas" },
        { "country_id": 122, "state_name": "Cesu" },
        { "country_id": 122, "state_name": "Daugavpils" },
        { "country_id": 122, "state_name": "Daugavpils City" },
        { "country_id": 122, "state_name": "Dobeles" },
        { "country_id": 122, "state_name": "Gulbenes" },
        { "country_id": 122, "state_name": "Jekabspils" },
        { "country_id": 122, "state_name": "Jelgava" },
        { "country_id": 122, "state_name": "Jelgavas" },
        { "country_id": 122, "state_name": "Jurmala City" },
        { "country_id": 122, "state_name": "Kraslavas" },
        { "country_id": 122, "state_name": "Kuldigas" },
        { "country_id": 122, "state_name": "Liepaja" },
        { "country_id": 122, "state_name": "Liepajas" },
        { "country_id": 122, "state_name": "Limbazhu" },
        { "country_id": 122, "state_name": "Ludzas" },
        { "country_id": 122, "state_name": "Madonas" },
        { "country_id": 122, "state_name": "Ogres" },
        { "country_id": 122, "state_name": "Preilu" },
        { "country_id": 122, "state_name": "Rezekne" },
        { "country_id": 122, "state_name": "Rezeknes" },
        { "country_id": 122, "state_name": "Riga" },
        { "country_id": 122, "state_name": "Rigas" },
        { "country_id": 122, "state_name": "Saldus" },
        { "country_id": 122, "state_name": "Talsu" },
        { "country_id": 122, "state_name": "Tukuma" },
        { "country_id": 122, "state_name": "Valkas" },
        { "country_id": 122, "state_name": "Valmieras" },
        { "country_id": 122, "state_name": "Ventspils" },
        { "country_id": 122, "state_name": "Ventspils City" }
      ]
    },
    {
      "country_id": 123,
      "country_name": "Lebanon",
      "states": [
        { "country_id": 123, "state_name": "Beirut" },
        { "country_id": 123, "state_name": "Jabal Lubnan" },
        { "country_id": 123, "state_name": "Mohafazat Liban-Nord" },
        { "country_id": 123, "state_name": "Mohafazat Mont-Liban" },
        { "country_id": 123, "state_name": "Sidon" },
        { "country_id": 123, "state_name": "al-Biqa" },
        { "country_id": 123, "state_name": "al-Janub" },
        { "country_id": 123, "state_name": "an-Nabatiyah" },
        { "country_id": 123, "state_name": "ash-Shamal" }
      ]
    },
    {
      "country_id": 124,
      "country_name": "Lesotho",
      "states": [
        { "country_id": 124, "state_name": "Berea" },
        { "country_id": 124, "state_name": "Butha-Buthe" },
        { "country_id": 124, "state_name": "Leribe" },
        { "country_id": 124, "state_name": "Mafeteng" },
        { "country_id": 124, "state_name": "Maseru" },
        { "country_id": 124, "state_name": "Mohale's Hoek" },
        { "country_id": 124, "state_name": "Mokhotlong" },
        { "country_id": 124, "state_name": "Qacha's Nek" },
        { "country_id": 124, "state_name": "Quthing" },
        { "country_id": 124, "state_name": "Thaba-Tseka" }
      ]
    },
    {
      "country_id": 125,
      "country_name": "Liberia",
      "states": [
        { "country_id": 125, "state_name": "Bomi" },
        { "country_id": 125, "state_name": "Bong" },
        { "country_id": 125, "state_name": "Grand Bassa" },
        { "country_id": 125, "state_name": "Grand Cape Mount" },
        { "country_id": 125, "state_name": "Grand Gedeh" },
        { "country_id": 125, "state_name": "Loffa" },
        { "country_id": 125, "state_name": "Margibi" },
        { "country_id": 125, "state_name": "Maryland and Grand Kru" },
        { "country_id": 125, "state_name": "Montserrado" },
        { "country_id": 125, "state_name": "Nimba" },
        { "country_id": 125, "state_name": "Rivercess" },
        { "country_id": 125, "state_name": "Sinoe" }
      ]
    },
    {
      "country_id": 126,
      "country_name": "Libya",
      "states": [
        { "country_id": 126, "state_name": "Ajdabiya" },
        { "country_id": 126, "state_name": "Fezzan" },
        { "country_id": 126, "state_name": "Banghazi" },
        { "country_id": 126, "state_name": "Darnah" },
        { "country_id": 126, "state_name": "Ghadamis" },
        { "country_id": 126, "state_name": "Gharyan" },
        { "country_id": 126, "state_name": "Misratah" },
        { "country_id": 126, "state_name": "Murzuq" },
        { "country_id": 126, "state_name": "Sabha" },
        { "country_id": 126, "state_name": "Sawfajjin" },
        { "country_id": 126, "state_name": "Surt" },
        { "country_id": 126, "state_name": "Tarabulus" },
        { "country_id": 126, "state_name": "Tarhunah" },
        { "country_id": 126, "state_name": "Tripolitania" },
        { "country_id": 126, "state_name": "Tubruq" },
        { "country_id": 126, "state_name": "Yafran" },
        { "country_id": 126, "state_name": "Zlitan" },
        { "country_id": 126, "state_name": "al-'Aziziyah'" },
        { "country_id": 126, "state_name": "al-Fatih" },
        { "country_id": 126, "state_name": "al-Jabal al Akhdar" },
        { "country_id": 126, "state_name": "al-Jufrah" },
        { "country_id": 126, "state_name": "al-Khums" },
        { "country_id": 126, "state_name": "al-Kufrah" },
        { "country_id": 126, "state_name": "an-Nuqat al-Khams" },
        { "country_id": 126, "state_name": "ash-Shati" },
        { "country_id": 126, "state_name": "az-Zawiyah" }
      ]
    },
    {
      "country_id": 127,
      "country_name": "Liechtenstein",
      "states": [
        { "country_id": 127, "state_name": "Balzers" },
        { "country_id": 127, "state_name": "Eschen" },
        { "country_id": 127, "state_name": "Gamprin" },
        { "country_id": 127, "state_name": "Mauren" },
        { "country_id": 127, "state_name": "Planken" },
        { "country_id": 127, "state_name": "Ruggell" },
        { "country_id": 127, "state_name": "Schaan" },
        { "country_id": 127, "state_name": "Schellenberg" },
        { "country_id": 127, "state_name": "Triesen" },
        { "country_id": 127, "state_name": "Triesenberg" },
        { "country_id": 127, "state_name": "Vaduz" }
      ]
    },
    {
      "country_id": 128,
      "country_name": "Lithuania",
      "states": [
        { "country_id": 128, "state_name": "Alytaus" },
        { "country_id": 128, "state_name": "Anyksciai" },
        { "country_id": 128, "state_name": "Kauno" },
        { "country_id": 128, "state_name": "Klaipedos" },
        { "country_id": 128, "state_name": "Marijampoles" },
        { "country_id": 128, "state_name": "Panevezhio" },
        { "country_id": 128, "state_name": "Panevezys" },
        { "country_id": 128, "state_name": "Shiauliu" },
        { "country_id": 128, "state_name": "Taurages" },
        { "country_id": 128, "state_name": "Telshiu" },
        { "country_id": 128, "state_name": "Telsiai" },
        { "country_id": 128, "state_name": "Utenos" },
        { "country_id": 128, "state_name": "Vilniaus" }
      ]
    },
    {
      "country_id": 129,
      "country_name": "Luxembourg",
      "states": [
        { "country_id": 129, "state_name": "Capellen" },
        { "country_id": 129, "state_name": "Clervaux" },
        { "country_id": 129, "state_name": "Diekirch" },
        { "country_id": 129, "state_name": "Echternach" },
        { "country_id": 129, "state_name": "Esch-sur-Alzette" },
        { "country_id": 129, "state_name": "Grevenmacher" },
        { "country_id": 129, "state_name": "Luxembourg" },
        { "country_id": 129, "state_name": "Mersch" },
        { "country_id": 129, "state_name": "Redange" },
        { "country_id": 129, "state_name": "Remich" },
        { "country_id": 129, "state_name": "Vianden" },
        { "country_id": 129, "state_name": "Wiltz" }
      ]
    },
    {
      "country_id": 130,
      "country_name": "Macau S.A.R.",
      "states": [{ "country_id": 130, "state_name": "Macau" }]
    },
    {
      "country_id": 131,
      "country_name": "Macedonia",
      "states": [
        { "country_id": 131, "state_name": "Berovo" },
        { "country_id": 131, "state_name": "Bitola" },
        { "country_id": 131, "state_name": "Brod" },
        { "country_id": 131, "state_name": "Debar" },
        { "country_id": 131, "state_name": "Delchevo" },
        { "country_id": 131, "state_name": "Demir Hisar" },
        { "country_id": 131, "state_name": "Gevgelija" },
        { "country_id": 131, "state_name": "Gostivar" },
        { "country_id": 131, "state_name": "Kavadarci" },
        { "country_id": 131, "state_name": "Kichevo" },
        { "country_id": 131, "state_name": "Kochani" },
        { "country_id": 131, "state_name": "Kratovo" },
        { "country_id": 131, "state_name": "Kriva Palanka" },
        { "country_id": 131, "state_name": "Krushevo" },
        { "country_id": 131, "state_name": "Kumanovo" },
        { "country_id": 131, "state_name": "Negotino" },
        { "country_id": 131, "state_name": "Ohrid" },
        { "country_id": 131, "state_name": "Prilep" },
        { "country_id": 131, "state_name": "Probishtip" },
        { "country_id": 131, "state_name": "Radovish" },
        { "country_id": 131, "state_name": "Resen" },
        { "country_id": 131, "state_name": "Shtip" },
        { "country_id": 131, "state_name": "Skopje" },
        { "country_id": 131, "state_name": "Struga" },
        { "country_id": 131, "state_name": "Strumica" },
        { "country_id": 131, "state_name": "Sveti Nikole" },
        { "country_id": 131, "state_name": "Tetovo" },
        { "country_id": 131, "state_name": "Valandovo" },
        { "country_id": 131, "state_name": "Veles" },
        { "country_id": 131, "state_name": "Vinica" }
      ]
    },
    {
      "country_id": 132,
      "country_name": "Madagascar",
      "states": [
        { "country_id": 132, "state_name": "Antananarivo" },
        { "country_id": 132, "state_name": "Antsiranana" },
        { "country_id": 132, "state_name": "Fianarantsoa" },
        { "country_id": 132, "state_name": "Mahajanga" },
        { "country_id": 132, "state_name": "Toamasina" },
        { "country_id": 132, "state_name": "Toliary" }
      ]
    },
    {
      "country_id": 133,
      "country_name": "Malawi",
      "states": [
        { "country_id": 133, "state_name": "Balaka" },
        { "country_id": 133, "state_name": "Blantyre City" },
        { "country_id": 133, "state_name": "Chikwawa" },
        { "country_id": 133, "state_name": "Chiradzulu" },
        { "country_id": 133, "state_name": "Chitipa" },
        { "country_id": 133, "state_name": "Dedza" },
        { "country_id": 133, "state_name": "Dowa" },
        { "country_id": 133, "state_name": "Karonga" },
        { "country_id": 133, "state_name": "Kasungu" },
        { "country_id": 133, "state_name": "Lilongwe City" },
        { "country_id": 133, "state_name": "Machinga" },
        { "country_id": 133, "state_name": "Mangochi" },
        { "country_id": 133, "state_name": "Mchinji" },
        { "country_id": 133, "state_name": "Mulanje" },
        { "country_id": 133, "state_name": "Mwanza" },
        { "country_id": 133, "state_name": "Mzimba" },
        { "country_id": 133, "state_name": "Mzuzu City" },
        { "country_id": 133, "state_name": "Nkhata Bay" },
        { "country_id": 133, "state_name": "Nkhotakota" },
        { "country_id": 133, "state_name": "Nsanje" },
        { "country_id": 133, "state_name": "Ntcheu" },
        { "country_id": 133, "state_name": "Ntchisi" },
        { "country_id": 133, "state_name": "Phalombe" },
        { "country_id": 133, "state_name": "Rumphi" },
        { "country_id": 133, "state_name": "Salima" },
        { "country_id": 133, "state_name": "Thyolo" },
        { "country_id": 133, "state_name": "Zomba Municipality" }
      ]
    },
    {
      "country_id": 134,
      "country_name": "Malaysia",
      "states": [
        { "country_id": 134, "state_name": "Johor" },
        { "country_id": 134, "state_name": "Kedah" },
        { "country_id": 134, "state_name": "Kelantan" },
        { "country_id": 134, "state_name": "Kuala Lumpur" },
        { "country_id": 134, "state_name": "Labuan" },
        { "country_id": 134, "state_name": "Melaka" },
        { "country_id": 134, "state_name": "Negeri Johor" },
        { "country_id": 134, "state_name": "Negeri Sembilan" },
        { "country_id": 134, "state_name": "Pahang" },
        { "country_id": 134, "state_name": "Penang" },
        { "country_id": 134, "state_name": "Perak" },
        { "country_id": 134, "state_name": "Perlis" },
        { "country_id": 134, "state_name": "Pulau Pinang" },
        { "country_id": 134, "state_name": "Sabah" },
        { "country_id": 134, "state_name": "Sarawak" },
        { "country_id": 134, "state_name": "Selangor" },
        { "country_id": 134, "state_name": "Sembilan" },
        { "country_id": 134, "state_name": "Terengganu" }
      ]
    },
    {
      "country_id": 135,
      "country_name": "Maldives",
      "states": [
        { "country_id": 135, "state_name": "Alif Alif" },
        { "country_id": 135, "state_name": "Alif Dhaal" },
        { "country_id": 135, "state_name": "Baa" },
        { "country_id": 135, "state_name": "Dhaal" },
        { "country_id": 135, "state_name": "Faaf" },
        { "country_id": 135, "state_name": "Gaaf Alif" },
        { "country_id": 135, "state_name": "Gaaf Dhaal" },
        { "country_id": 135, "state_name": "Ghaviyani" },
        { "country_id": 135, "state_name": "Haa Alif" },
        { "country_id": 135, "state_name": "Haa Dhaal" },
        { "country_id": 135, "state_name": "Kaaf" },
        { "country_id": 135, "state_name": "Laam" },
        { "country_id": 135, "state_name": "Lhaviyani" },
        { "country_id": 135, "state_name": "Male" },
        { "country_id": 135, "state_name": "Miim" },
        { "country_id": 135, "state_name": "Nuun" },
        { "country_id": 135, "state_name": "Raa" },
        { "country_id": 135, "state_name": "Shaviyani" },
        { "country_id": 135, "state_name": "Siin" },
        { "country_id": 135, "state_name": "Thaa" },
        { "country_id": 135, "state_name": "Vaav" }
      ]
    },
    {
      "country_id": 136,
      "country_name": "Mali",
      "states": [
        { "country_id": 136, "state_name": "Bamako" },
        { "country_id": 136, "state_name": "Gao" },
        { "country_id": 136, "state_name": "Kayes" },
        { "country_id": 136, "state_name": "Kidal" },
        { "country_id": 136, "state_name": "Koulikoro" },
        { "country_id": 136, "state_name": "Mopti" },
        { "country_id": 136, "state_name": "Segou" },
        { "country_id": 136, "state_name": "Sikasso" },
        { "country_id": 136, "state_name": "Tombouctou" }
      ]
    },
    {
      "country_id": 137,
      "country_name": "Malta",
      "states": [
        { "country_id": 137, "state_name": "Gozo and Comino" },
        { "country_id": 137, "state_name": "Inner Harbour" },
        { "country_id": 137, "state_name": "Northern" },
        { "country_id": 137, "state_name": "Outer Harbour" },
        { "country_id": 137, "state_name": "South Eastern" },
        { "country_id": 137, "state_name": "Valletta" },
        { "country_id": 137, "state_name": "Western" }
      ]
    },
    {
      "country_id": 138,
      "country_name": "Man (Isle of)",
      "states": [
        { "country_id": 138, "state_name": "Castletown" },
        { "country_id": 138, "state_name": "Douglas" },
        { "country_id": 138, "state_name": "Laxey" },
        { "country_id": 138, "state_name": "Onchan" },
        { "country_id": 138, "state_name": "Peel" },
        { "country_id": 138, "state_name": "Port Erin" },
        { "country_id": 138, "state_name": "Port Saint Mary" },
        { "country_id": 138, "state_name": "Ramsey" }
      ]
    },
    {
      "country_id": 139,
      "country_name": "Marshall Islands",
      "states": [
        { "country_id": 139, "state_name": "Ailinlaplap" },
        { "country_id": 139, "state_name": "Ailuk" },
        { "country_id": 139, "state_name": "Arno" },
        { "country_id": 139, "state_name": "Aur" },
        { "country_id": 139, "state_name": "Bikini" },
        { "country_id": 139, "state_name": "Ebon" },
        { "country_id": 139, "state_name": "Enewetak" },
        { "country_id": 139, "state_name": "Jabat" },
        { "country_id": 139, "state_name": "Jaluit" },
        { "country_id": 139, "state_name": "Kili" },
        { "country_id": 139, "state_name": "Kwajalein" },
        { "country_id": 139, "state_name": "Lae" },
        { "country_id": 139, "state_name": "Lib" },
        { "country_id": 139, "state_name": "Likiep" },
        { "country_id": 139, "state_name": "Majuro" },
        { "country_id": 139, "state_name": "Maloelap" },
        { "country_id": 139, "state_name": "Mejit" },
        { "country_id": 139, "state_name": "Mili" },
        { "country_id": 139, "state_name": "Namorik" },
        { "country_id": 139, "state_name": "Namu" },
        { "country_id": 139, "state_name": "Rongelap" },
        { "country_id": 139, "state_name": "Ujae" },
        { "country_id": 139, "state_name": "Utrik" },
        { "country_id": 139, "state_name": "Wotho" },
        { "country_id": 139, "state_name": "Wotje" }
      ]
    },
    {
      "country_id": 140,
      "country_name": "Martinique",
      "states": [
        { "country_id": 140, "state_name": "Fort-de-France" },
        { "country_id": 140, "state_name": "La Trinite" },
        { "country_id": 140, "state_name": "Le Marin" },
        { "country_id": 140, "state_name": "Saint-Pierre" }
      ]
    },
    {
      "country_id": 141,
      "country_name": "Mauritania",
      "states": [
        { "country_id": 141, "state_name": "Adrar" },
        { "country_id": 141, "state_name": "Assaba" },
        { "country_id": 141, "state_name": "Brakna" },
        { "country_id": 141, "state_name": "Dhakhlat Nawadibu" },
        { "country_id": 141, "state_name": "Hudh-al-Gharbi" },
        { "country_id": 141, "state_name": "Hudh-ash-Sharqi" },
        { "country_id": 141, "state_name": "Inshiri" },
        { "country_id": 141, "state_name": "Nawakshut" },
        { "country_id": 141, "state_name": "Qidimagha" },
        { "country_id": 141, "state_name": "Qurqul" },
        { "country_id": 141, "state_name": "Taqant" },
        { "country_id": 141, "state_name": "Tiris Zammur" },
        { "country_id": 141, "state_name": "Trarza" }
      ]
    },
    {
      "country_id": 142,
      "country_name": "Mauritius",
      "states": [
        { "country_id": 142, "state_name": "Black River" },
        { "country_id": 142, "state_name": "Eau Coulee" },
        { "country_id": 142, "state_name": "Flacq" },
        { "country_id": 142, "state_name": "Floreal" },
        { "country_id": 142, "state_name": "Grand Port" },
        { "country_id": 142, "state_name": "Moka" },
        { "country_id": 142, "state_name": "Pamplempousses" },
        { "country_id": 142, "state_name": "Plaines Wilhelm" },
        { "country_id": 142, "state_name": "Port Louis" },
        { "country_id": 142, "state_name": "Riviere du Rempart" },
        { "country_id": 142, "state_name": "Rodrigues" },
        { "country_id": 142, "state_name": "Rose Hill" },
        { "country_id": 142, "state_name": "Savanne" }
      ]
    },
    {
      "country_id": 143,
      "country_name": "Mayotte",
      "states": [
        { "country_id": 143, "state_name": "Mayotte" },
        { "country_id": 143, "state_name": "Pamanzi" }
      ]
    },
    {
      "country_id": 144,
      "country_name": "Mexico",
      "states": [
        { "country_id": 144, "state_name": "Aguascalientes" },
        { "country_id": 144, "state_name": "Baja California" },
        { "country_id": 144, "state_name": "Baja California Sur" },
        { "country_id": 144, "state_name": "Campeche" },
        { "country_id": 144, "state_name": "Chiapas" },
        { "country_id": 144, "state_name": "Chihuahua" },
        { "country_id": 144, "state_name": "Coahuila" },
        { "country_id": 144, "state_name": "Colima" },
        { "country_id": 144, "state_name": "Distrito Federal" },
        { "country_id": 144, "state_name": "Durango" },
        { "country_id": 144, "state_name": "Estado de Mexico" },
        { "country_id": 144, "state_name": "Guanajuato" },
        { "country_id": 144, "state_name": "Guerrero" },
        { "country_id": 144, "state_name": "Hidalgo" },
        { "country_id": 144, "state_name": "Jalisco" },
        { "country_id": 144, "state_name": "Mexico" },
        { "country_id": 144, "state_name": "Michoacan" },
        { "country_id": 144, "state_name": "Morelos" },
        { "country_id": 144, "state_name": "Nayarit" },
        { "country_id": 144, "state_name": "Nuevo Leon" },
        { "country_id": 144, "state_name": "Oaxaca" },
        { "country_id": 144, "state_name": "Puebla" },
        { "country_id": 144, "state_name": "Queretaro" },
        { "country_id": 144, "state_name": "Quintana Roo" },
        { "country_id": 144, "state_name": "San Luis Potosi" },
        { "country_id": 144, "state_name": "Sinaloa" },
        { "country_id": 144, "state_name": "Sonora" },
        { "country_id": 144, "state_name": "Tabasco" },
        { "country_id": 144, "state_name": "Tamaulipas" },
        { "country_id": 144, "state_name": "Tlaxcala" },
        { "country_id": 144, "state_name": "Veracruz" },
        { "country_id": 144, "state_name": "Yucatan" },
        { "country_id": 144, "state_name": "Zacatecas" }
      ]
    },
    {
      "country_id": 145,
      "country_name": "Micronesia",
      "states": [
        { "country_id": 145, "state_name": "Chuuk" },
        { "country_id": 145, "state_name": "Kusaie" },
        { "country_id": 145, "state_name": "Pohnpei" },
        { "country_id": 145, "state_name": "Yap" }
      ]
    },
    {
      "country_id": 146,
      "country_name": "Moldova",
      "states": [
        { "country_id": 146, "state_name": "Balti" },
        { "country_id": 146, "state_name": "Cahul" },
        { "country_id": 146, "state_name": "Chisinau" },
        { "country_id": 146, "state_name": "Chisinau Oras" },
        { "country_id": 146, "state_name": "Edinet" },
        { "country_id": 146, "state_name": "Gagauzia" },
        { "country_id": 146, "state_name": "Lapusna" },
        { "country_id": 146, "state_name": "Orhei" },
        { "country_id": 146, "state_name": "Soroca" },
        { "country_id": 146, "state_name": "Taraclia" },
        { "country_id": 146, "state_name": "Tighina" },
        { "country_id": 146, "state_name": "Transnistria" },
        { "country_id": 146, "state_name": "Ungheni" }
      ]
    },
    {
      "country_id": 147,
      "country_name": "Monaco",
      "states": [
        { "country_id": 147, "state_name": "Fontvieille" },
        { "country_id": 147, "state_name": "La Condamine" },
        { "country_id": 147, "state_name": "Monaco-Ville" },
        { "country_id": 147, "state_name": "Monte Carlo" }
      ]
    },
    {
      "country_id": 148,
      "country_name": "Mongolia",
      "states": [
        { "country_id": 148, "state_name": "Arhangaj" },
        { "country_id": 148, "state_name": "Bajan-Olgij" },
        { "country_id": 148, "state_name": "Bajanhongor" },
        { "country_id": 148, "state_name": "Bulgan" },
        { "country_id": 148, "state_name": "Darhan-Uul" },
        { "country_id": 148, "state_name": "Dornod" },
        { "country_id": 148, "state_name": "Dornogovi" },
        { "country_id": 148, "state_name": "Dundgovi" },
        { "country_id": 148, "state_name": "Govi-Altaj" },
        { "country_id": 148, "state_name": "Govisumber" },
        { "country_id": 148, "state_name": "Hentij" },
        { "country_id": 148, "state_name": "Hovd" },
        { "country_id": 148, "state_name": "Hovsgol" },
        { "country_id": 148, "state_name": "Omnogovi" },
        { "country_id": 148, "state_name": "Orhon" },
        { "country_id": 148, "state_name": "Ovorhangaj" },
        { "country_id": 148, "state_name": "Selenge" },
        { "country_id": 148, "state_name": "Suhbaatar" },
        { "country_id": 148, "state_name": "Tov" },
        { "country_id": 148, "state_name": "Ulaanbaatar" },
        { "country_id": 148, "state_name": "Uvs" },
        { "country_id": 148, "state_name": "Zavhan" }
      ]
    },
    {
      "country_id": 149,
      "country_name": "Montserrat",
      "states": [{ "country_id": 149, "state_name": "Montserrat" }]
    },
    {
      "country_id": 150,
      "country_name": "Morocco",
      "states": [
        { "country_id": 150, "state_name": "Agadir" },
        { "country_id": 150, "state_name": "Casablanca" },
        { "country_id": 150, "state_name": "Chaouia-Ouardigha" },
        { "country_id": 150, "state_name": "Doukkala-Abda" },
        { "country_id": 150, "state_name": "Fes-Boulemane" },
        { "country_id": 150, "state_name": "Gharb-Chrarda-Beni Hssen" },
        { "country_id": 150, "state_name": "Guelmim" },
        { "country_id": 150, "state_name": "Kenitra" },
        { "country_id": 150, "state_name": "Marrakech-Tensift-Al Haouz" },
        { "country_id": 150, "state_name": "Meknes-Tafilalet" },
        { "country_id": 150, "state_name": "Oriental" },
        { "country_id": 150, "state_name": "Oujda" },
        { "country_id": 150, "state_name": "Province de Tanger" },
        { "country_id": 150, "state_name": "Rabat-Sale-Zammour-Zaer" },
        { "country_id": 150, "state_name": "Sala Al Jadida" },
        { "country_id": 150, "state_name": "Settat" },
        { "country_id": 150, "state_name": "Souss Massa-Draa" },
        { "country_id": 150, "state_name": "Tadla-Azilal" },
        { "country_id": 150, "state_name": "Tangier-Tetouan" },
        { "country_id": 150, "state_name": "Taza-Al Hoceima-Taounate" },
        { "country_id": 150, "state_name": "Wilaya de Casablanca" },
        { "country_id": 150, "state_name": "Wilaya de Rabat-Sale" }
      ]
    },
    {
      "country_id": 151,
      "country_name": "Mozambique",
      "states": [
        { "country_id": 151, "state_name": "Cabo Delgado" },
        { "country_id": 151, "state_name": "Gaza" },
        { "country_id": 151, "state_name": "Inhambane" },
        { "country_id": 151, "state_name": "Manica" },
        { "country_id": 151, "state_name": "Maputo" },
        { "country_id": 151, "state_name": "Maputo Provincia" },
        { "country_id": 151, "state_name": "Nampula" },
        { "country_id": 151, "state_name": "Niassa" },
        { "country_id": 151, "state_name": "Sofala" },
        { "country_id": 151, "state_name": "Tete" },
        { "country_id": 151, "state_name": "Zambezia" }
      ]
    },
    {
      "country_id": 152,
      "country_name": "Myanmar",
      "states": [
        { "country_id": 152, "state_name": "Ayeyarwady" },
        { "country_id": 152, "state_name": "Bago" },
        { "country_id": 152, "state_name": "Chin" },
        { "country_id": 152, "state_name": "Kachin" },
        { "country_id": 152, "state_name": "Kayah" },
        { "country_id": 152, "state_name": "Kayin" },
        { "country_id": 152, "state_name": "Magway" },
        { "country_id": 152, "state_name": "Mandalay" },
        { "country_id": 152, "state_name": "Mon" },
        { "country_id": 152, "state_name": "Nay Pyi Taw" },
        { "country_id": 152, "state_name": "Rakhine" },
        { "country_id": 152, "state_name": "Sagaing" },
        { "country_id": 152, "state_name": "Shan" },
        { "country_id": 152, "state_name": "Tanintharyi" },
        { "country_id": 152, "state_name": "Yangon" }
      ]
    },
    {
      "country_id": 153,
      "country_name": "Namibia",
      "states": [
        { "country_id": 153, "state_name": "Caprivi" },
        { "country_id": 153, "state_name": "Erongo" },
        { "country_id": 153, "state_name": "Hardap" },
        { "country_id": 153, "state_name": "Karas" },
        { "country_id": 153, "state_name": "Kavango" },
        { "country_id": 153, "state_name": "Khomas" },
        { "country_id": 153, "state_name": "Kunene" },
        { "country_id": 153, "state_name": "Ohangwena" },
        { "country_id": 153, "state_name": "Omaheke" },
        { "country_id": 153, "state_name": "Omusati" },
        { "country_id": 153, "state_name": "Oshana" },
        { "country_id": 153, "state_name": "Oshikoto" },
        { "country_id": 153, "state_name": "Otjozondjupa" }
      ]
    },
    {
      "country_id": 154,
      "country_name": "Nauru",
      "states": [{ "country_id": 154, "state_name": "Yaren" }]
    },
    {
      "country_id": 155,
      "country_name": "Nepal",
      "states": [
        { "country_id": 155, "state_name": "Bagmati" },
        { "country_id": 155, "state_name": "Bheri" },
        { "country_id": 155, "state_name": "Dhawalagiri" },
        { "country_id": 155, "state_name": "Gandaki" },
        { "country_id": 155, "state_name": "Janakpur" },
        { "country_id": 155, "state_name": "Karnali" },
        { "country_id": 155, "state_name": "Koshi" },
        { "country_id": 155, "state_name": "Lumbini" },
        { "country_id": 155, "state_name": "Mahakali" },
        { "country_id": 155, "state_name": "Mechi" },
        { "country_id": 155, "state_name": "Narayani" },
        { "country_id": 155, "state_name": "Rapti" },
        { "country_id": 155, "state_name": "Sagarmatha" },
        { "country_id": 155, "state_name": "Seti" }
      ]
    },
    {
      "country_id": 156,
      "country_name": "Netherlands Antilles",
      "states": [
        { "country_id": 156, "state_name": "Bonaire" },
        { "country_id": 156, "state_name": "Curacao" },
        { "country_id": 156, "state_name": "Saba" },
        { "country_id": 156, "state_name": "Sint Eustatius" },
        { "country_id": 156, "state_name": "Sint Maarten" }
      ]
    },
    {
      "country_id": 157,
      "country_name": "Netherlands The",
      "states": [
        { "country_id": 157, "state_name": "Amsterdam" },
        { "country_id": 157, "state_name": "Benelux" },
        { "country_id": 157, "state_name": "Drenthe" },
        { "country_id": 157, "state_name": "Flevoland" },
        { "country_id": 157, "state_name": "Friesland" },
        { "country_id": 157, "state_name": "Gelderland" },
        { "country_id": 157, "state_name": "Groningen" },
        { "country_id": 157, "state_name": "Limburg" },
        { "country_id": 157, "state_name": "Noord-Brabant" },
        { "country_id": 157, "state_name": "Noord-Holland" },
        { "country_id": 157, "state_name": "Overijssel" },
        { "country_id": 157, "state_name": "South Holland" },
        { "country_id": 157, "state_name": "Utrecht" },
        { "country_id": 157, "state_name": "Zeeland" },
        { "country_id": 157, "state_name": "Zuid-Holland" }
      ]
    },
    {
      "country_id": 158,
      "country_name": "New Caledonia",
      "states": [
        { "country_id": 158, "state_name": "Iles" },
        { "country_id": 158, "state_name": "Nord" },
        { "country_id": 158, "state_name": "Sud" }
      ]
    },
    {
      "country_id": 159,
      "country_name": "New Zealand",
      "states": [
        { "country_id": 159, "state_name": "Area Outside Region" },
        { "country_id": 159, "state_name": "Auckland" },
        { "country_id": 159, "state_name": "Bay of Plenty" },
        { "country_id": 159, "state_name": "Canterbury" },
        { "country_id": 159, "state_name": "Christchurch" },
        { "country_id": 159, "state_name": "Gisborne" },
        { "country_id": 159, "state_name": "Hawke's Bay" },
        { "country_id": 159, "state_name": "Manawatu-Wanganui" },
        { "country_id": 159, "state_name": "Marlborough" },
        { "country_id": 159, "state_name": "Nelson" },
        { "country_id": 159, "state_name": "Northland" },
        { "country_id": 159, "state_name": "Otago" },
        { "country_id": 159, "state_name": "Rodney" },
        { "country_id": 159, "state_name": "Southland" },
        { "country_id": 159, "state_name": "Taranaki" },
        { "country_id": 159, "state_name": "Tasman" },
        { "country_id": 159, "state_name": "Waikato" },
        { "country_id": 159, "state_name": "Wellington" },
        { "country_id": 159, "state_name": "West Coast" }
      ]
    },
    {
      "country_id": 160,
      "country_name": "Nicaragua",
      "states": [
        { "country_id": 160, "state_name": "Atlantico Norte" },
        { "country_id": 160, "state_name": "Atlantico Sur" },
        { "country_id": 160, "state_name": "Boaco" },
        { "country_id": 160, "state_name": "Carazo" },
        { "country_id": 160, "state_name": "Chinandega" },
        { "country_id": 160, "state_name": "Chontales" },
        { "country_id": 160, "state_name": "Esteli" },
        { "country_id": 160, "state_name": "Granada" },
        { "country_id": 160, "state_name": "Jinotega" },
        { "country_id": 160, "state_name": "Leon" },
        { "country_id": 160, "state_name": "Madriz" },
        { "country_id": 160, "state_name": "Managua" },
        { "country_id": 160, "state_name": "Masaya" },
        { "country_id": 160, "state_name": "Matagalpa" },
        { "country_id": 160, "state_name": "Nueva Segovia" },
        { "country_id": 160, "state_name": "Rio San Juan" },
        { "country_id": 160, "state_name": "Rivas" }
      ]
    },
    {
      "country_id": 161,
      "country_name": "Niger",
      "states": [
        { "country_id": 161, "state_name": "Agadez" },
        { "country_id": 161, "state_name": "Diffa" },
        { "country_id": 161, "state_name": "Dosso" },
        { "country_id": 161, "state_name": "Maradi" },
        { "country_id": 161, "state_name": "Niamey" },
        { "country_id": 161, "state_name": "Tahoua" },
        { "country_id": 161, "state_name": "Tillabery" },
        { "country_id": 161, "state_name": "Zinder" }
      ]
    },
    {
      "country_id": 162,
      "country_name": "Nigeria",
      "states": [
        { "country_id": 162, "state_name": "Abia" },
        { "country_id": 162, "state_name": "Abuja Federal Capital Territor" },
        { "country_id": 162, "state_name": "Adamawa" },
        { "country_id": 162, "state_name": "Akwa Ibom" },
        { "country_id": 162, "state_name": "Anambra" },
        { "country_id": 162, "state_name": "Bauchi" },
        { "country_id": 162, "state_name": "Bayelsa" },
        { "country_id": 162, "state_name": "Benue" },
        { "country_id": 162, "state_name": "Borno" },
        { "country_id": 162, "state_name": "Cross River" },
        { "country_id": 162, "state_name": "Delta" },
        { "country_id": 162, "state_name": "Ebonyi" },
        { "country_id": 162, "state_name": "Edo" },
        { "country_id": 162, "state_name": "Ekiti" },
        { "country_id": 162, "state_name": "Enugu" },
        { "country_id": 162, "state_name": "Gombe" },
        { "country_id": 162, "state_name": "Imo" },
        { "country_id": 162, "state_name": "Jigawa" },
        { "country_id": 162, "state_name": "Kaduna" },
        { "country_id": 162, "state_name": "Kano" },
        { "country_id": 162, "state_name": "Katsina" },
        { "country_id": 162, "state_name": "Kebbi" },
        { "country_id": 162, "state_name": "Kogi" },
        { "country_id": 162, "state_name": "Kwara" },
        { "country_id": 162, "state_name": "Lagos" },
        { "country_id": 162, "state_name": "Nassarawa" },
        { "country_id": 162, "state_name": "Niger" },
        { "country_id": 162, "state_name": "Ogun" },
        { "country_id": 162, "state_name": "Ondo" },
        { "country_id": 162, "state_name": "Osun" },
        { "country_id": 162, "state_name": "Oyo" },
        { "country_id": 162, "state_name": "Plateau" },
        { "country_id": 162, "state_name": "Rivers" },
        { "country_id": 162, "state_name": "Sokoto" },
        { "country_id": 162, "state_name": "Taraba" },
        { "country_id": 162, "state_name": "Yobe" },
        { "country_id": 162, "state_name": "Zamfara" }
      ]
    },
    {
      "country_id": 163,
      "country_name": "Niue",
      "states": [{ "country_id": 163, "state_name": "Niue" }]
    },
    {
      "country_id": 164,
      "country_name": "Norfolk Island",
      "states": [{ "country_id": 164, "state_name": "Norfolk Island" }]
    },
    {
      "country_id": 165,
      "country_name": "Northern Mariana Islands",
      "states": [
        { "country_id": 165, "state_name": "Northern Islands" },
        { "country_id": 165, "state_name": "Rota" },
        { "country_id": 165, "state_name": "Saipan" },
        { "country_id": 165, "state_name": "Tinian" }
      ]
    },
    {
      "country_id": 166,
      "country_name": "Norway",
      "states": [
        { "country_id": 166, "state_name": "Akershus" },
        { "country_id": 166, "state_name": "Aust Agder" },
        { "country_id": 166, "state_name": "Bergen" },
        { "country_id": 166, "state_name": "Buskerud" },
        { "country_id": 166, "state_name": "Finnmark" },
        { "country_id": 166, "state_name": "Hedmark" },
        { "country_id": 166, "state_name": "Hordaland" },
        { "country_id": 166, "state_name": "Moere og Romsdal" },
        { "country_id": 166, "state_name": "Nord Trondelag" },
        { "country_id": 166, "state_name": "Nordland" },
        { "country_id": 166, "state_name": "Oestfold" },
        { "country_id": 166, "state_name": "Oppland" },
        { "country_id": 166, "state_name": "Oslo" },
        { "country_id": 166, "state_name": "Rogaland" },
        { "country_id": 166, "state_name": "Soer Troendelag" },
        { "country_id": 166, "state_name": "Sogn og Fjordane" },
        { "country_id": 166, "state_name": "Stavern" },
        { "country_id": 166, "state_name": "Sykkylven" },
        { "country_id": 166, "state_name": "Telemark" },
        { "country_id": 166, "state_name": "Troms" },
        { "country_id": 166, "state_name": "Vest Agder" },
        { "country_id": 166, "state_name": "Vestfold" },
        { "country_id": 166, "state_name": "\u00c3\u0192\u00c2\u02dcstfold" }
      ]
    },
    {
      "country_id": 167,
      "country_name": "Oman",
      "states": [
        { "country_id": 167, "state_name": "Al Buraimi" },
        { "country_id": 167, "state_name": "Dhufar" },
        { "country_id": 167, "state_name": "Masqat" },
        { "country_id": 167, "state_name": "Musandam" },
        { "country_id": 167, "state_name": "Rusayl" },
        { "country_id": 167, "state_name": "Wadi Kabir" },
        { "country_id": 167, "state_name": "ad-Dakhiliyah" },
        { "country_id": 167, "state_name": "adh-Dhahirah" },
        { "country_id": 167, "state_name": "al-Batinah" },
        { "country_id": 167, "state_name": "ash-Sharqiyah" }
      ]
    },
    {
      "country_id": 168,
      "country_name": "Pakistan",
      "states": [
        { "country_id": 168, "state_name": "Baluchistan" },
        { "country_id": 168, "state_name": "Federal Capital Area" },
        { "country_id": 168, "state_name": "Federally administered Tribal " },
        { "country_id": 168, "state_name": "North-West Frontier" },
        { "country_id": 168, "state_name": "Northern Areas" },
        { "country_id": 168, "state_name": "Punjab" },
        { "country_id": 168, "state_name": "Sind" }
      ]
    },
    {
      "country_id": 169,
      "country_name": "Palau",
      "states": [
        { "country_id": 169, "state_name": "Aimeliik" },
        { "country_id": 169, "state_name": "Airai" },
        { "country_id": 169, "state_name": "Angaur" },
        { "country_id": 169, "state_name": "Hatobohei" },
        { "country_id": 169, "state_name": "Kayangel" },
        { "country_id": 169, "state_name": "Koror" },
        { "country_id": 169, "state_name": "Melekeok" },
        { "country_id": 169, "state_name": "Ngaraard" },
        { "country_id": 169, "state_name": "Ngardmau" },
        { "country_id": 169, "state_name": "Ngaremlengui" },
        { "country_id": 169, "state_name": "Ngatpang" },
        { "country_id": 169, "state_name": "Ngchesar" },
        { "country_id": 169, "state_name": "Ngerchelong" },
        { "country_id": 169, "state_name": "Ngiwal" },
        { "country_id": 169, "state_name": "Peleliu" },
        { "country_id": 169, "state_name": "Sonsorol" }
      ]
    },
    {
      "country_id": 170,
      "country_name": "Palestinian Territory Occupied",
      "states": [
        { "country_id": 170, "state_name": "Ariha" },
        { "country_id": 170, "state_name": "Bayt Lahm" },
        { "country_id": 170, "state_name": "Bethlehem" },
        { "country_id": 170, "state_name": "Dayr-al-Balah" },
        { "country_id": 170, "state_name": "Ghazzah" },
        { "country_id": 170, "state_name": "Ghazzah ash-Shamaliyah" },
        { "country_id": 170, "state_name": "Janin" },
        { "country_id": 170, "state_name": "Khan Yunis" },
        { "country_id": 170, "state_name": "Nabulus" },
        { "country_id": 170, "state_name": "Qalqilyah" },
        { "country_id": 170, "state_name": "Rafah" },
        { "country_id": 170, "state_name": "Ram Allah wal-Birah" },
        { "country_id": 170, "state_name": "Salfit" },
        { "country_id": 170, "state_name": "Tubas" },
        { "country_id": 170, "state_name": "Tulkarm" },
        { "country_id": 170, "state_name": "al-Khalil" },
        { "country_id": 170, "state_name": "al-Quds" }
      ]
    },
    {
      "country_id": 171,
      "country_name": "Panama",
      "states": [
        { "country_id": 171, "state_name": "Bocas del Toro" },
        { "country_id": 171, "state_name": "Chiriqui" },
        { "country_id": 171, "state_name": "Cocle" },
        { "country_id": 171, "state_name": "Colon" },
        { "country_id": 171, "state_name": "Darien" },
        { "country_id": 171, "state_name": "Embera" },
        { "country_id": 171, "state_name": "Herrera" },
        { "country_id": 171, "state_name": "Kuna Yala" },
        { "country_id": 171, "state_name": "Los Santos" },
        { "country_id": 171, "state_name": "Ngobe Bugle" },
        { "country_id": 171, "state_name": "Panama" },
        { "country_id": 171, "state_name": "Veraguas" }
      ]
    },
    {
      "country_id": 172,
      "country_name": "Papua new Guinea",
      "states": [
        { "country_id": 172, "state_name": "East New Britain" },
        { "country_id": 172, "state_name": "East Sepik" },
        { "country_id": 172, "state_name": "Eastern Highlands" },
        { "country_id": 172, "state_name": "Enga" },
        { "country_id": 172, "state_name": "Fly River" },
        { "country_id": 172, "state_name": "Gulf" },
        { "country_id": 172, "state_name": "Madang" },
        { "country_id": 172, "state_name": "Manus" },
        { "country_id": 172, "state_name": "Milne Bay" },
        { "country_id": 172, "state_name": "Morobe" },
        { "country_id": 172, "state_name": "National Capital District" },
        { "country_id": 172, "state_name": "New Ireland" },
        { "country_id": 172, "state_name": "North Solomons" },
        { "country_id": 172, "state_name": "Oro" },
        { "country_id": 172, "state_name": "Sandaun" },
        { "country_id": 172, "state_name": "Simbu" },
        { "country_id": 172, "state_name": "Southern Highlands" },
        { "country_id": 172, "state_name": "West New Britain" },
        { "country_id": 172, "state_name": "Western Highlands" }
      ]
    },
    {
      "country_id": 173,
      "country_name": "Paraguay",
      "states": [
        { "country_id": 173, "state_name": "Alto Paraguay" },
        { "country_id": 173, "state_name": "Alto Parana" },
        { "country_id": 173, "state_name": "Amambay" },
        { "country_id": 173, "state_name": "Asuncion" },
        { "country_id": 173, "state_name": "Boqueron" },
        { "country_id": 173, "state_name": "Caaguazu" },
        { "country_id": 173, "state_name": "Caazapa" },
        { "country_id": 173, "state_name": "Canendiyu" },
        { "country_id": 173, "state_name": "Central" },
        { "country_id": 173, "state_name": "Concepcion" },
        { "country_id": 173, "state_name": "Cordillera" },
        { "country_id": 173, "state_name": "Guaira" },
        { "country_id": 173, "state_name": "Itapua" },
        { "country_id": 173, "state_name": "Misiones" },
        { "country_id": 173, "state_name": "Neembucu" },
        { "country_id": 173, "state_name": "Paraguari" },
        { "country_id": 173, "state_name": "Presidente Hayes" },
        { "country_id": 173, "state_name": "San Pedro" }
      ]
    },
    {
      "country_id": 174,
      "country_name": "Peru",
      "states": [
        { "country_id": 174, "state_name": "Amazonas" },
        { "country_id": 174, "state_name": "Ancash" },
        { "country_id": 174, "state_name": "Apurimac" },
        { "country_id": 174, "state_name": "Arequipa" },
        { "country_id": 174, "state_name": "Ayacucho" },
        { "country_id": 174, "state_name": "Cajamarca" },
        { "country_id": 174, "state_name": "Cusco" },
        { "country_id": 174, "state_name": "Huancavelica" },
        { "country_id": 174, "state_name": "Huanuco" },
        { "country_id": 174, "state_name": "Ica" },
        { "country_id": 174, "state_name": "Junin" },
        { "country_id": 174, "state_name": "La Libertad" },
        { "country_id": 174, "state_name": "Lambayeque" },
        { "country_id": 174, "state_name": "Lima y Callao" },
        { "country_id": 174, "state_name": "Loreto" },
        { "country_id": 174, "state_name": "Madre de Dios" },
        { "country_id": 174, "state_name": "Moquegua" },
        { "country_id": 174, "state_name": "Pasco" },
        { "country_id": 174, "state_name": "Piura" },
        { "country_id": 174, "state_name": "Puno" },
        { "country_id": 174, "state_name": "San Martin" },
        { "country_id": 174, "state_name": "Tacna" },
        { "country_id": 174, "state_name": "Tumbes" },
        { "country_id": 174, "state_name": "Ucayali" }
      ]
    },
    {
      "country_id": 175,
      "country_name": "Philippines",
      "states": [
        { "country_id": 175, "state_name": "Batangas" },
        { "country_id": 175, "state_name": "Bicol" },
        { "country_id": 175, "state_name": "Bulacan" },
        { "country_id": 175, "state_name": "Cagayan" },
        { "country_id": 175, "state_name": "Caraga" },
        { "country_id": 175, "state_name": "Central Luzon" },
        { "country_id": 175, "state_name": "Central Mindanao" },
        { "country_id": 175, "state_name": "Central Visayas" },
        { "country_id": 175, "state_name": "Cordillera" },
        { "country_id": 175, "state_name": "Davao" },
        { "country_id": 175, "state_name": "Eastern Visayas" },
        { "country_id": 175, "state_name": "Greater Metropolitan Area" },
        { "country_id": 175, "state_name": "Ilocos" },
        { "country_id": 175, "state_name": "Laguna" },
        { "country_id": 175, "state_name": "Luzon" },
        { "country_id": 175, "state_name": "Mactan" },
        { "country_id": 175, "state_name": "Metropolitan Manila Area" },
        { "country_id": 175, "state_name": "Muslim Mindanao" },
        { "country_id": 175, "state_name": "Northern Mindanao" },
        { "country_id": 175, "state_name": "Southern Mindanao" },
        { "country_id": 175, "state_name": "Southern Tagalog" },
        { "country_id": 175, "state_name": "Western Mindanao" },
        { "country_id": 175, "state_name": "Western Visayas" }
      ]
    },
    {
      "country_id": 176,
      "country_name": "Pitcairn Island",
      "states": [{ "country_id": 176, "state_name": "Pitcairn Island" }]
    },
    {
      "country_id": 177,
      "country_name": "Poland",
      "states": [
        { "country_id": 177, "state_name": "Biale Blota" },
        { "country_id": 177, "state_name": "Dobroszyce" },
        { "country_id": 177, "state_name": "Dolnoslaskie" },
        { "country_id": 177, "state_name": "Dziekanow Lesny" },
        { "country_id": 177, "state_name": "Hopowo" },
        { "country_id": 177, "state_name": "Kartuzy" },
        { "country_id": 177, "state_name": "Koscian" },
        { "country_id": 177, "state_name": "Krakow" },
        { "country_id": 177, "state_name": "Kujawsko-Pomorskie" },
        { "country_id": 177, "state_name": "Lodzkie" },
        { "country_id": 177, "state_name": "Lubelskie" },
        { "country_id": 177, "state_name": "Lubuskie" },
        { "country_id": 177, "state_name": "Malomice" },
        { "country_id": 177, "state_name": "Malopolskie" },
        { "country_id": 177, "state_name": "Mazowieckie" },
        { "country_id": 177, "state_name": "Mirkow" },
        { "country_id": 177, "state_name": "Opolskie" },
        { "country_id": 177, "state_name": "Ostrowiec" },
        { "country_id": 177, "state_name": "Podkarpackie" },
        { "country_id": 177, "state_name": "Podlaskie" },
        { "country_id": 177, "state_name": "Polska" },
        { "country_id": 177, "state_name": "Pomorskie" },
        { "country_id": 177, "state_name": "Poznan" },
        { "country_id": 177, "state_name": "Pruszkow" },
        { "country_id": 177, "state_name": "Rymanowska" },
        { "country_id": 177, "state_name": "Rzeszow" },
        { "country_id": 177, "state_name": "Slaskie" },
        { "country_id": 177, "state_name": "Stare Pole" },
        { "country_id": 177, "state_name": "Swietokrzyskie" },
        { "country_id": 177, "state_name": "Warminsko-Mazurskie" },
        { "country_id": 177, "state_name": "Warsaw" },
        { "country_id": 177, "state_name": "Wejherowo" },
        { "country_id": 177, "state_name": "Wielkopolskie" },
        { "country_id": 177, "state_name": "Wroclaw" },
        { "country_id": 177, "state_name": "Zachodnio-Pomorskie" },
        { "country_id": 177, "state_name": "Zukowo" }
      ]
    },
    {
      "country_id": 178,
      "country_name": "Portugal",
      "states": [
        { "country_id": 178, "state_name": "Abrantes" },
        { "country_id": 178, "state_name": "Acores" },
        { "country_id": 178, "state_name": "Alentejo" },
        { "country_id": 178, "state_name": "Algarve" },
        { "country_id": 178, "state_name": "Braga" },
        { "country_id": 178, "state_name": "Centro" },
        { "country_id": 178, "state_name": "Distrito de Leiria" },
        { "country_id": 178, "state_name": "Distrito de Viana do Castelo" },
        { "country_id": 178, "state_name": "Distrito de Vila Real" },
        { "country_id": 178, "state_name": "Distrito do Porto" },
        { "country_id": 178, "state_name": "Lisboa e Vale do Tejo" },
        { "country_id": 178, "state_name": "Madeira" },
        { "country_id": 178, "state_name": "Norte" },
        { "country_id": 178, "state_name": "Paivas" }
      ]
    },
    {
      "country_id": 179,
      "country_name": "Puerto Rico",
      "states": [
        { "country_id": 179, "state_name": "Arecibo" },
        { "country_id": 179, "state_name": "Bayamon" },
        { "country_id": 179, "state_name": "Carolina" },
        { "country_id": 179, "state_name": "Florida" },
        { "country_id": 179, "state_name": "Guayama" },
        { "country_id": 179, "state_name": "Humacao" },
        { "country_id": 179, "state_name": "Mayaguez-Aguadilla" },
        { "country_id": 179, "state_name": "Ponce" },
        { "country_id": 179, "state_name": "Salinas" },
        { "country_id": 179, "state_name": "San Juan" }
      ]
    },
    {
      "country_id": 180,
      "country_name": "Qatar",
      "states": [
        { "country_id": 180, "state_name": "Doha" },
        { "country_id": 180, "state_name": "Jarian-al-Batnah" },
        { "country_id": 180, "state_name": "Umm Salal" },
        { "country_id": 180, "state_name": "ad-Dawhah" },
        { "country_id": 180, "state_name": "al-Ghuwayriyah" },
        { "country_id": 180, "state_name": "al-Jumayliyah" },
        { "country_id": 180, "state_name": "al-Khawr" },
        { "country_id": 180, "state_name": "al-Wakrah" },
        { "country_id": 180, "state_name": "ar-Rayyan" },
        { "country_id": 180, "state_name": "ash-Shamal" }
      ]
    },
    {
      "country_id": 181,
      "country_name": "Reunion",
      "states": [
        { "country_id": 181, "state_name": "Saint-Benoit" },
        { "country_id": 181, "state_name": "Saint-Denis" },
        { "country_id": 181, "state_name": "Saint-Paul" },
        { "country_id": 181, "state_name": "Saint-Pierre" }
      ]
    },
    {
      "country_id": 182,
      "country_name": "Romania",
      "states": [
        { "country_id": 182, "state_name": "Alba" },
        { "country_id": 182, "state_name": "Arad" },
        { "country_id": 182, "state_name": "Arges" },
        { "country_id": 182, "state_name": "Bacau" },
        { "country_id": 182, "state_name": "Bihor" },
        { "country_id": 182, "state_name": "Bistrita-Nasaud" },
        { "country_id": 182, "state_name": "Botosani" },
        { "country_id": 182, "state_name": "Braila" },
        { "country_id": 182, "state_name": "Brasov" },
        { "country_id": 182, "state_name": "Bucuresti" },
        { "country_id": 182, "state_name": "Buzau" },
        { "country_id": 182, "state_name": "Calarasi" },
        { "country_id": 182, "state_name": "Caras-Severin" },
        { "country_id": 182, "state_name": "Cluj" },
        { "country_id": 182, "state_name": "Constanta" },
        { "country_id": 182, "state_name": "Covasna" },
        { "country_id": 182, "state_name": "Dambovita" },
        { "country_id": 182, "state_name": "Dolj" },
        { "country_id": 182, "state_name": "Galati" },
        { "country_id": 182, "state_name": "Giurgiu" },
        { "country_id": 182, "state_name": "Gorj" },
        { "country_id": 182, "state_name": "Harghita" },
        { "country_id": 182, "state_name": "Hunedoara" },
        { "country_id": 182, "state_name": "Ialomita" },
        { "country_id": 182, "state_name": "Iasi" },
        { "country_id": 182, "state_name": "Ilfov" },
        { "country_id": 182, "state_name": "Maramures" },
        { "country_id": 182, "state_name": "Mehedinti" },
        { "country_id": 182, "state_name": "Mures" },
        { "country_id": 182, "state_name": "Neamt" },
        { "country_id": 182, "state_name": "Olt" },
        { "country_id": 182, "state_name": "Prahova" },
        { "country_id": 182, "state_name": "Salaj" },
        { "country_id": 182, "state_name": "Satu Mare" },
        { "country_id": 182, "state_name": "Sibiu" },
        { "country_id": 182, "state_name": "Sondelor" },
        { "country_id": 182, "state_name": "Suceava" },
        { "country_id": 182, "state_name": "Teleorman" },
        { "country_id": 182, "state_name": "Timis" },
        { "country_id": 182, "state_name": "Tulcea" },
        { "country_id": 182, "state_name": "Valcea" },
        { "country_id": 182, "state_name": "Vaslui" },
        { "country_id": 182, "state_name": "Vrancea" }
      ]
    },
    {
      "country_id": 183,
      "country_name": "Russia",
      "states": [
        { "country_id": 183, "state_name": "Adygeja" },
        { "country_id": 183, "state_name": "Aga" },
        { "country_id": 183, "state_name": "Alanija" },
        { "country_id": 183, "state_name": "Altaj" },
        { "country_id": 183, "state_name": "Amur" },
        { "country_id": 183, "state_name": "Arhangelsk" },
        { "country_id": 183, "state_name": "Astrahan" },
        { "country_id": 183, "state_name": "Bashkortostan" },
        { "country_id": 183, "state_name": "Belgorod" },
        { "country_id": 183, "state_name": "Brjansk" },
        { "country_id": 183, "state_name": "Burjatija" },
        { "country_id": 183, "state_name": "Chechenija" },
        { "country_id": 183, "state_name": "Cheljabinsk" },
        { "country_id": 183, "state_name": "Chita" },
        { "country_id": 183, "state_name": "Chukotka" },
        { "country_id": 183, "state_name": "Chuvashija" },
        { "country_id": 183, "state_name": "Dagestan" },
        { "country_id": 183, "state_name": "Evenkija" },
        { "country_id": 183, "state_name": "Gorno-Altaj" },
        { "country_id": 183, "state_name": "Habarovsk" },
        { "country_id": 183, "state_name": "Hakasija" },
        { "country_id": 183, "state_name": "Hanty-Mansija" },
        { "country_id": 183, "state_name": "Ingusetija" },
        { "country_id": 183, "state_name": "Irkutsk" },
        { "country_id": 183, "state_name": "Ivanovo" },
        { "country_id": 183, "state_name": "Jamalo-Nenets" },
        { "country_id": 183, "state_name": "Jaroslavl" },
        { "country_id": 183, "state_name": "Jevrej" },
        { "country_id": 183, "state_name": "Kabardino-Balkarija" },
        { "country_id": 183, "state_name": "Kaliningrad" },
        { "country_id": 183, "state_name": "Kalmykija" },
        { "country_id": 183, "state_name": "Kaluga" },
        { "country_id": 183, "state_name": "Kamchatka" },
        { "country_id": 183, "state_name": "Karachaj-Cherkessija" },
        { "country_id": 183, "state_name": "Karelija" },
        { "country_id": 183, "state_name": "Kemerovo" },
        { "country_id": 183, "state_name": "Khabarovskiy Kray" },
        { "country_id": 183, "state_name": "Kirov" },
        { "country_id": 183, "state_name": "Komi" },
        { "country_id": 183, "state_name": "Komi-Permjakija" },
        { "country_id": 183, "state_name": "Korjakija" },
        { "country_id": 183, "state_name": "Kostroma" },
        { "country_id": 183, "state_name": "Krasnodar" },
        { "country_id": 183, "state_name": "Krasnojarsk" },
        { "country_id": 183, "state_name": "Krasnoyarskiy Kray" },
        { "country_id": 183, "state_name": "Kurgan" },
        { "country_id": 183, "state_name": "Kursk" },
        { "country_id": 183, "state_name": "Leningrad" },
        { "country_id": 183, "state_name": "Lipeck" },
        { "country_id": 183, "state_name": "Magadan" },
        { "country_id": 183, "state_name": "Marij El" },
        { "country_id": 183, "state_name": "Mordovija" },
        { "country_id": 183, "state_name": "Moscow" },
        { "country_id": 183, "state_name": "Moskovskaja Oblast" },
        { "country_id": 183, "state_name": "Moskovskaya Oblast" },
        { "country_id": 183, "state_name": "Moskva" },
        { "country_id": 183, "state_name": "Murmansk" },
        { "country_id": 183, "state_name": "Nenets" },
        { "country_id": 183, "state_name": "Nizhnij Novgorod" },
        { "country_id": 183, "state_name": "Novgorod" },
        { "country_id": 183, "state_name": "Novokusnezk" },
        { "country_id": 183, "state_name": "Novosibirsk" },
        { "country_id": 183, "state_name": "Omsk" },
        { "country_id": 183, "state_name": "Orenburg" },
        { "country_id": 183, "state_name": "Orjol" },
        { "country_id": 183, "state_name": "Penza" },
        { "country_id": 183, "state_name": "Perm" },
        { "country_id": 183, "state_name": "Primorje" },
        { "country_id": 183, "state_name": "Pskov" },
        { "country_id": 183, "state_name": "Pskovskaya Oblast" },
        { "country_id": 183, "state_name": "Rjazan" },
        { "country_id": 183, "state_name": "Rostov" },
        { "country_id": 183, "state_name": "Saha" },
        { "country_id": 183, "state_name": "Sahalin" },
        { "country_id": 183, "state_name": "Samara" },
        { "country_id": 183, "state_name": "Samarskaya" },
        { "country_id": 183, "state_name": "Sankt-Peterburg" },
        { "country_id": 183, "state_name": "Saratov" },
        { "country_id": 183, "state_name": "Smolensk" },
        { "country_id": 183, "state_name": "Stavropol" },
        { "country_id": 183, "state_name": "Sverdlovsk" },
        { "country_id": 183, "state_name": "Tajmyrija" },
        { "country_id": 183, "state_name": "Tambov" },
        { "country_id": 183, "state_name": "Tatarstan" },
        { "country_id": 183, "state_name": "Tjumen" },
        { "country_id": 183, "state_name": "Tomsk" },
        { "country_id": 183, "state_name": "Tula" },
        { "country_id": 183, "state_name": "Tver" },
        { "country_id": 183, "state_name": "Tyva" },
        { "country_id": 183, "state_name": "Udmurtija" },
        { "country_id": 183, "state_name": "Uljanovsk" },
        { "country_id": 183, "state_name": "Ulyanovskaya Oblast" },
        { "country_id": 183, "state_name": "Ust-Orda" },
        { "country_id": 183, "state_name": "Vladimir" },
        { "country_id": 183, "state_name": "Volgograd" },
        { "country_id": 183, "state_name": "Vologda" },
        { "country_id": 183, "state_name": "Voronezh" }
      ]
    },
    {
      "country_id": 184,
      "country_name": "Rwanda",
      "states": [
        { "country_id": 184, "state_name": "Butare" },
        { "country_id": 184, "state_name": "Byumba" },
        { "country_id": 184, "state_name": "Cyangugu" },
        { "country_id": 184, "state_name": "Gikongoro" },
        { "country_id": 184, "state_name": "Gisenyi" },
        { "country_id": 184, "state_name": "Gitarama" },
        { "country_id": 184, "state_name": "Kibungo" },
        { "country_id": 184, "state_name": "Kibuye" },
        { "country_id": 184, "state_name": "Kigali-ngali" },
        { "country_id": 184, "state_name": "Ruhengeri" }
      ]
    },
    {
      "country_id": 185,
      "country_name": "Saint Helena",
      "states": [
        { "country_id": 185, "state_name": "Ascension" },
        { "country_id": 185, "state_name": "Gough Island" },
        { "country_id": 185, "state_name": "Saint Helena" },
        { "country_id": 185, "state_name": "Tristan da Cunha" }
      ]
    },
    {
      "country_id": 186,
      "country_name": "Saint Kitts And Nevis",
      "states": [
        { "country_id": 186, "state_name": "Christ Church Nichola Town" },
        { "country_id": 186, "state_name": "Saint Anne Sandy Point" },
        { "country_id": 186, "state_name": "Saint George Basseterre" },
        { "country_id": 186, "state_name": "Saint George Gingerland" },
        { "country_id": 186, "state_name": "Saint James Windward" },
        { "country_id": 186, "state_name": "Saint John Capesterre" },
        { "country_id": 186, "state_name": "Saint John Figtree" },
        { "country_id": 186, "state_name": "Saint Mary Cayon" },
        { "country_id": 186, "state_name": "Saint Paul Capesterre" },
        { "country_id": 186, "state_name": "Saint Paul Charlestown" },
        { "country_id": 186, "state_name": "Saint Peter Basseterre" },
        { "country_id": 186, "state_name": "Saint Thomas Lowland" },
        { "country_id": 186, "state_name": "Saint Thomas Middle Island" },
        { "country_id": 186, "state_name": "Trinity Palmetto Point" }
      ]
    },
    {
      "country_id": 187,
      "country_name": "Saint Lucia",
      "states": [
        { "country_id": 187, "state_name": "Anse-la-Raye" },
        { "country_id": 187, "state_name": "Canaries" },
        { "country_id": 187, "state_name": "Castries" },
        { "country_id": 187, "state_name": "Choiseul" },
        { "country_id": 187, "state_name": "Dennery" },
        { "country_id": 187, "state_name": "Gros Inlet" },
        { "country_id": 187, "state_name": "Laborie" },
        { "country_id": 187, "state_name": "Micoud" },
        { "country_id": 187, "state_name": "Soufriere" },
        { "country_id": 187, "state_name": "Vieux Fort" }
      ]
    },
    {
      "country_id": 188,
      "country_name": "Saint Pierre and Miquelon",
      "states": [
        { "country_id": 188, "state_name": "Miquelon-Langlade" },
        { "country_id": 188, "state_name": "Saint-Pierre" }
      ]
    },
    {
      "country_id": 189,
      "country_name": "Saint Vincent And The Grenadines",
      "states": [
        { "country_id": 189, "state_name": "Charlotte" },
        { "country_id": 189, "state_name": "Grenadines" },
        { "country_id": 189, "state_name": "Saint Andrew" },
        { "country_id": 189, "state_name": "Saint David" },
        { "country_id": 189, "state_name": "Saint George" },
        { "country_id": 189, "state_name": "Saint Patrick" }
      ]
    },
    {
      "country_id": 190,
      "country_name": "Samoa",
      "states": [
        { "country_id": 190, "state_name": "A'ana" },
        { "country_id": 190, "state_name": "Aiga-i-le-Tai" },
        { "country_id": 190, "state_name": "Atua" },
        { "country_id": 190, "state_name": "Fa'asaleleaga" },
        { "country_id": 190, "state_name": "Gaga'emauga" },
        { "country_id": 190, "state_name": "Gagaifomauga" },
        { "country_id": 190, "state_name": "Palauli" },
        { "country_id": 190, "state_name": "Satupa'itea" },
        { "country_id": 190, "state_name": "Tuamasaga" },
        { "country_id": 190, "state_name": "Va'a-o-Fonoti" },
        { "country_id": 190, "state_name": "Vaisigano" }
      ]
    },
    {
      "country_id": 191,
      "country_name": "San Marino",
      "states": [
        { "country_id": 191, "state_name": "Acquaviva" },
        { "country_id": 191, "state_name": "Borgo Maggiore" },
        { "country_id": 191, "state_name": "Chiesanuova" },
        { "country_id": 191, "state_name": "Domagnano" },
        { "country_id": 191, "state_name": "Faetano" },
        { "country_id": 191, "state_name": "Fiorentino" },
        { "country_id": 191, "state_name": "Montegiardino" },
        { "country_id": 191, "state_name": "San Marino" },
        { "country_id": 191, "state_name": "Serravalle" }
      ]
    },
    {
      "country_id": 192,
      "country_name": "Sao Tome and Principe",
      "states": [
        { "country_id": 192, "state_name": "Agua Grande" },
        { "country_id": 192, "state_name": "Cantagalo" },
        { "country_id": 192, "state_name": "Lemba" },
        { "country_id": 192, "state_name": "Lobata" },
        { "country_id": 192, "state_name": "Me-Zochi" },
        { "country_id": 192, "state_name": "Pague" }
      ]
    },
    {
      "country_id": 193,
      "country_name": "Saudi Arabia",
      "states": [
        { "country_id": 193, "state_name": "Al Khobar" },
        { "country_id": 193, "state_name": "Aseer" },
        { "country_id": 193, "state_name": "Ash Sharqiyah" },
        { "country_id": 193, "state_name": "Asir" },
        { "country_id": 193, "state_name": "Central Province" },
        { "country_id": 193, "state_name": "Eastern Province" },
        { "country_id": 193, "state_name": "Ha'il" },
        { "country_id": 193, "state_name": "Jawf" },
        { "country_id": 193, "state_name": "Jizan" },
        { "country_id": 193, "state_name": "Makkah" },
        { "country_id": 193, "state_name": "Najran" },
        { "country_id": 193, "state_name": "Qasim" },
        { "country_id": 193, "state_name": "Tabuk" },
        { "country_id": 193, "state_name": "Western Province" },
        { "country_id": 193, "state_name": "al-Bahah" },
        { "country_id": 193, "state_name": "al-Hudud-ash-Shamaliyah" },
        { "country_id": 193, "state_name": "al-Madinah" },
        { "country_id": 193, "state_name": "ar-Riyad" }
      ]
    },
    {
      "country_id": 194,
      "country_name": "Senegal",
      "states": [
        { "country_id": 194, "state_name": "Dakar" },
        { "country_id": 194, "state_name": "Diourbel" },
        { "country_id": 194, "state_name": "Fatick" },
        { "country_id": 194, "state_name": "Kaolack" },
        { "country_id": 194, "state_name": "Kolda" },
        { "country_id": 194, "state_name": "Louga" },
        { "country_id": 194, "state_name": "Saint-Louis" },
        { "country_id": 194, "state_name": "Tambacounda" },
        { "country_id": 194, "state_name": "Thies" },
        { "country_id": 194, "state_name": "Ziguinchor" }
      ]
    },
    {
      "country_id": 195,
      "country_name": "Serbia",
      "states": [
        { "country_id": 195, "state_name": "Central Serbia" },
        { "country_id": 195, "state_name": "Kosovo and Metohija" },
        { "country_id": 195, "state_name": "Vojvodina" }
      ]
    },
    {
      "country_id": 196,
      "country_name": "Seychelles",
      "states": [
        { "country_id": 196, "state_name": "Anse Boileau" },
        { "country_id": 196, "state_name": "Anse Royale" },
        { "country_id": 196, "state_name": "Cascade" },
        { "country_id": 196, "state_name": "Takamaka" },
        { "country_id": 196, "state_name": "Victoria" }
      ]
    },
    {
      "country_id": 197,
      "country_name": "Sierra Leone",
      "states": [
        { "country_id": 197, "state_name": "Eastern" },
        { "country_id": 197, "state_name": "Northern" },
        { "country_id": 197, "state_name": "Southern" },
        { "country_id": 197, "state_name": "Western" }
      ]
    },
    {
      "country_id": 198,
      "country_name": "Singapore",
      "states": [{ "country_id": 198, "state_name": "Singapore" }]
    },
    {
      "country_id": 199,
      "country_name": "Slovakia",
      "states": [
        { "country_id": 199, "state_name": "Banskobystricky" },
        { "country_id": 199, "state_name": "Bratislavsky" },
        { "country_id": 199, "state_name": "Kosicky" },
        { "country_id": 199, "state_name": "Nitriansky" },
        { "country_id": 199, "state_name": "Presovsky" },
        { "country_id": 199, "state_name": "Trenciansky" },
        { "country_id": 199, "state_name": "Trnavsky" },
        { "country_id": 199, "state_name": "Zilinsky" }
      ]
    },
    {
      "country_id": 200,
      "country_name": "Slovenia",
      "states": [
        { "country_id": 200, "state_name": "Benedikt" },
        { "country_id": 200, "state_name": "Gorenjska" },
        { "country_id": 200, "state_name": "Gorishka" },
        { "country_id": 200, "state_name": "Jugovzhodna Slovenija" },
        { "country_id": 200, "state_name": "Koroshka" },
        { "country_id": 200, "state_name": "Notranjsko-krashka" },
        { "country_id": 200, "state_name": "Obalno-krashka" },
        { "country_id": 200, "state_name": "Obcina Domzale" },
        { "country_id": 200, "state_name": "Obcina Vitanje" },
        { "country_id": 200, "state_name": "Osrednjeslovenska" },
        { "country_id": 200, "state_name": "Podravska" },
        { "country_id": 200, "state_name": "Pomurska" },
        { "country_id": 200, "state_name": "Savinjska" },
        { "country_id": 200, "state_name": "Slovenian Littoral" },
        { "country_id": 200, "state_name": "Spodnjeposavska" },
        { "country_id": 200, "state_name": "Zasavska" }
      ]
    },
    {
      "country_id": 201,
      "country_name": "Smaller Territories of the UK",
      "states": [{ "country_id": 201, "state_name": "Pitcairn" }]
    },
    {
      "country_id": 202,
      "country_name": "Solomon Islands",
      "states": [
        { "country_id": 202, "state_name": "Central" },
        { "country_id": 202, "state_name": "Choiseul" },
        { "country_id": 202, "state_name": "Guadalcanal" },
        { "country_id": 202, "state_name": "Isabel" },
        { "country_id": 202, "state_name": "Makira and Ulawa" },
        { "country_id": 202, "state_name": "Malaita" },
        { "country_id": 202, "state_name": "Rennell and Bellona" },
        { "country_id": 202, "state_name": "Temotu" },
        { "country_id": 202, "state_name": "Western" }
      ]
    },
    {
      "country_id": 203,
      "country_name": "Somalia",
      "states": [
        { "country_id": 203, "state_name": "Awdal" },
        { "country_id": 203, "state_name": "Bakol" },
        { "country_id": 203, "state_name": "Banadir" },
        { "country_id": 203, "state_name": "Bari" },
        { "country_id": 203, "state_name": "Bay" },
        { "country_id": 203, "state_name": "Galgudug" },
        { "country_id": 203, "state_name": "Gedo" },
        { "country_id": 203, "state_name": "Hiran" },
        { "country_id": 203, "state_name": "Jubbada Hose" },
        { "country_id": 203, "state_name": "Jubbadha Dexe" },
        { "country_id": 203, "state_name": "Mudug" },
        { "country_id": 203, "state_name": "Nugal" },
        { "country_id": 203, "state_name": "Sanag" },
        { "country_id": 203, "state_name": "Shabellaha Dhexe" },
        { "country_id": 203, "state_name": "Shabellaha Hose" },
        { "country_id": 203, "state_name": "Togdher" },
        { "country_id": 203, "state_name": "Woqoyi Galbed" }
      ]
    },
    {
      "country_id": 204,
      "country_name": "South Africa",
      "states": [
        { "country_id": 204, "state_name": "Eastern Cape" },
        { "country_id": 204, "state_name": "Free State" },
        { "country_id": 204, "state_name": "Gauteng" },
        { "country_id": 204, "state_name": "Kempton Park" },
        { "country_id": 204, "state_name": "Kramerville" },
        { "country_id": 204, "state_name": "KwaZulu Natal" },
        { "country_id": 204, "state_name": "Limpopo" },
        { "country_id": 204, "state_name": "Mpumalanga" },
        { "country_id": 204, "state_name": "North West" },
        { "country_id": 204, "state_name": "Northern Cape" },
        { "country_id": 204, "state_name": "Parow" },
        { "country_id": 204, "state_name": "Table View" },
        { "country_id": 204, "state_name": "Umtentweni" },
        { "country_id": 204, "state_name": "Western Cape" }
      ]
    },
    {
      "country_id": 205,
      "country_name": "South Georgia",
      "states": [{ "country_id": 205, "state_name": "South Georgia" }]
    },
    {
      "country_id": 206,
      "country_name": "South Sudan",
      "states": [{ "country_id": 206, "state_name": "Central Equatoria" }]
    },
    {
      "country_id": 207,
      "country_name": "Spain",
      "states": [
        { "country_id": 207, "state_name": "A Coruna" },
        { "country_id": 207, "state_name": "Alacant" },
        { "country_id": 207, "state_name": "Alava" },
        { "country_id": 207, "state_name": "Albacete" },
        { "country_id": 207, "state_name": "Almeria" },
        { "country_id": 207, "state_name": "Asturias" },
        { "country_id": 207, "state_name": "Avila" },
        { "country_id": 207, "state_name": "Badajoz" },
        { "country_id": 207, "state_name": "Balears" },
        { "country_id": 207, "state_name": "Barcelona" },
        { "country_id": 207, "state_name": "Burgos" },
        { "country_id": 207, "state_name": "Caceres" },
        { "country_id": 207, "state_name": "Cadiz" },
        { "country_id": 207, "state_name": "Cantabria" },
        { "country_id": 207, "state_name": "Castello" },
        { "country_id": 207, "state_name": "Ceuta" },
        { "country_id": 207, "state_name": "Ciudad Real" },
        { "country_id": 207, "state_name": "Cordoba" },
        { "country_id": 207, "state_name": "Cuenca" },
        { "country_id": 207, "state_name": "Girona" },
        { "country_id": 207, "state_name": "Granada" },
        { "country_id": 207, "state_name": "Guadalajara" },
        { "country_id": 207, "state_name": "Guipuzcoa" },
        { "country_id": 207, "state_name": "Huelva" },
        { "country_id": 207, "state_name": "Huesca" },
        { "country_id": 207, "state_name": "Jaen" },
        { "country_id": 207, "state_name": "La Rioja" },
        { "country_id": 207, "state_name": "Las Palmas" },
        { "country_id": 207, "state_name": "Leon" },
        { "country_id": 207, "state_name": "Lleida" },
        { "country_id": 207, "state_name": "Lugo" },
        { "country_id": 207, "state_name": "Madrid" },
        { "country_id": 207, "state_name": "Malaga" },
        { "country_id": 207, "state_name": "Melilla" },
        { "country_id": 207, "state_name": "Murcia" },
        { "country_id": 207, "state_name": "Navarra" },
        { "country_id": 207, "state_name": "Ourense" },
        { "country_id": 207, "state_name": "Pais Vasco" },
        { "country_id": 207, "state_name": "Palencia" },
        { "country_id": 207, "state_name": "Pontevedra" },
        { "country_id": 207, "state_name": "Salamanca" },
        { "country_id": 207, "state_name": "Segovia" },
        { "country_id": 207, "state_name": "Sevilla" },
        { "country_id": 207, "state_name": "Soria" },
        { "country_id": 207, "state_name": "Tarragona" },
        { "country_id": 207, "state_name": "Santa Cruz de Tenerife" },
        { "country_id": 207, "state_name": "Teruel" },
        { "country_id": 207, "state_name": "Toledo" },
        { "country_id": 207, "state_name": "Valencia" },
        { "country_id": 207, "state_name": "Valladolid" },
        { "country_id": 207, "state_name": "Vizcaya" },
        { "country_id": 207, "state_name": "Zamora" },
        { "country_id": 207, "state_name": "Zaragoza" }
      ]
    },
    {
      "country_id": 208,
      "country_name": "Sri Lanka",
      "states": [
        { "country_id": 208, "state_name": "Amparai" },
        { "country_id": 208, "state_name": "Anuradhapuraya" },
        { "country_id": 208, "state_name": "Badulla" },
        { "country_id": 208, "state_name": "Boralesgamuwa" },
        { "country_id": 208, "state_name": "Colombo" },
        { "country_id": 208, "state_name": "Galla" },
        { "country_id": 208, "state_name": "Gampaha" },
        { "country_id": 208, "state_name": "Hambantota" },
        { "country_id": 208, "state_name": "Kalatura" },
        { "country_id": 208, "state_name": "Kegalla" },
        { "country_id": 208, "state_name": "Kilinochchi" },
        { "country_id": 208, "state_name": "Kurunegala" },
        { "country_id": 208, "state_name": "Madakalpuwa" },
        { "country_id": 208, "state_name": "Maha Nuwara" },
        { "country_id": 208, "state_name": "Malwana" },
        { "country_id": 208, "state_name": "Mannarama" },
        { "country_id": 208, "state_name": "Matale" },
        { "country_id": 208, "state_name": "Matara" },
        { "country_id": 208, "state_name": "Monaragala" },
        { "country_id": 208, "state_name": "Mullaitivu" },
        { "country_id": 208, "state_name": "North Eastern Province" },
        { "country_id": 208, "state_name": "North Western Province" },
        { "country_id": 208, "state_name": "Nuwara Eliya" },
        { "country_id": 208, "state_name": "Polonnaruwa" },
        { "country_id": 208, "state_name": "Puttalama" },
        { "country_id": 208, "state_name": "Ratnapuraya" },
        { "country_id": 208, "state_name": "Southern Province" },
        { "country_id": 208, "state_name": "Tirikunamalaya" },
        { "country_id": 208, "state_name": "Tuscany" },
        { "country_id": 208, "state_name": "Vavuniyawa" },
        { "country_id": 208, "state_name": "Western Province" },
        { "country_id": 208, "state_name": "Yapanaya" },
        { "country_id": 208, "state_name": "kadawatha" }
      ]
    },
    {
      "country_id": 209,
      "country_name": "Sudan",
      "states": [
        { "country_id": 209, "state_name": "A'ali-an-Nil" },
        { "country_id": 209, "state_name": "Bahr-al-Jabal" },
        { "country_id": 209, "state_name": "Central Equatoria" },
        { "country_id": 209, "state_name": "Gharb Bahr-al-Ghazal" },
        { "country_id": 209, "state_name": "Gharb Darfur" },
        { "country_id": 209, "state_name": "Gharb Kurdufan" },
        { "country_id": 209, "state_name": "Gharb-al-Istiwa'iyah" },
        { "country_id": 209, "state_name": "Janub Darfur" },
        { "country_id": 209, "state_name": "Janub Kurdufan" },
        { "country_id": 209, "state_name": "Junqali" },
        { "country_id": 209, "state_name": "Kassala" },
        { "country_id": 209, "state_name": "Nahr-an-Nil" },
        { "country_id": 209, "state_name": "Shamal Bahr-al-Ghazal" },
        { "country_id": 209, "state_name": "Shamal Darfur" },
        { "country_id": 209, "state_name": "Shamal Kurdufan" },
        { "country_id": 209, "state_name": "Sharq-al-Istiwa'iyah" },
        { "country_id": 209, "state_name": "Sinnar" },
        { "country_id": 209, "state_name": "Warab" },
        { "country_id": 209, "state_name": "Wilayat al Khartum" },
        { "country_id": 209, "state_name": "al-Bahr-al-Ahmar" },
        { "country_id": 209, "state_name": "al-Buhayrat" },
        { "country_id": 209, "state_name": "al-Jazirah" },
        { "country_id": 209, "state_name": "al-Khartum" },
        { "country_id": 209, "state_name": "al-Qadarif" },
        { "country_id": 209, "state_name": "al-Wahdah" },
        { "country_id": 209, "state_name": "an-Nil-al-Abyad" },
        { "country_id": 209, "state_name": "an-Nil-al-Azraq" },
        { "country_id": 209, "state_name": "ash-Shamaliyah" }
      ]
    },
    {
      "country_id": 210,
      "country_name": "Suriname",
      "states": [
        { "country_id": 210, "state_name": "Brokopondo" },
        { "country_id": 210, "state_name": "Commewijne" },
        { "country_id": 210, "state_name": "Coronie" },
        { "country_id": 210, "state_name": "Marowijne" },
        { "country_id": 210, "state_name": "Nickerie" },
        { "country_id": 210, "state_name": "Para" },
        { "country_id": 210, "state_name": "Paramaribo" },
        { "country_id": 210, "state_name": "Saramacca" },
        { "country_id": 210, "state_name": "Wanica" }
      ]
    },
    {
      "country_id": 211,
      "country_name": "Svalbard And Jan Mayen Islands",
      "states": [{ "country_id": 211, "state_name": "Svalbard" }]
    },
    {
      "country_id": 212,
      "country_name": "Swaziland",
      "states": [
        { "country_id": 212, "state_name": "Hhohho" },
        { "country_id": 212, "state_name": "Lubombo" },
        { "country_id": 212, "state_name": "Manzini" },
        { "country_id": 212, "state_name": "Shiselweni" }
      ]
    },
    {
      "country_id": 213,
      "country_name": "Sweden",
      "states": [
        { "country_id": 213, "state_name": "Alvsborgs Lan" },
        { "country_id": 213, "state_name": "Angermanland" },
        { "country_id": 213, "state_name": "Blekinge" },
        { "country_id": 213, "state_name": "Bohuslan" },
        { "country_id": 213, "state_name": "Dalarna" },
        { "country_id": 213, "state_name": "Gavleborg" },
        { "country_id": 213, "state_name": "Gaza" },
        { "country_id": 213, "state_name": "Gotland" },
        { "country_id": 213, "state_name": "Halland" },
        { "country_id": 213, "state_name": "Jamtland" },
        { "country_id": 213, "state_name": "Jonkoping" },
        { "country_id": 213, "state_name": "Kalmar" },
        { "country_id": 213, "state_name": "Kristianstads" },
        { "country_id": 213, "state_name": "Kronoberg" },
        { "country_id": 213, "state_name": "Norrbotten" },
        { "country_id": 213, "state_name": "Orebro" },
        { "country_id": 213, "state_name": "Ostergotland" },
        { "country_id": 213, "state_name": "Saltsjo-Boo" },
        { "country_id": 213, "state_name": "Skane" },
        { "country_id": 213, "state_name": "Smaland" },
        { "country_id": 213, "state_name": "Sodermanland" },
        { "country_id": 213, "state_name": "Stockholm" },
        { "country_id": 213, "state_name": "Uppsala" },
        { "country_id": 213, "state_name": "Varmland" },
        { "country_id": 213, "state_name": "Vasterbotten" },
        { "country_id": 213, "state_name": "Vastergotland" },
        { "country_id": 213, "state_name": "Vasternorrland" },
        { "country_id": 213, "state_name": "Vastmanland" },
        { "country_id": 213, "state_name": "Vastra Gotaland" }
      ]
    },
    {
      "country_id": 214,
      "country_name": "Switzerland",
      "states": [
        { "country_id": 214, "state_name": "Aargau" },
        { "country_id": 214, "state_name": "Appenzell Inner-Rhoden" },
        { "country_id": 214, "state_name": "Appenzell-Ausser Rhoden" },
        { "country_id": 214, "state_name": "Basel-Landschaft" },
        { "country_id": 214, "state_name": "Basel-Stadt" },
        { "country_id": 214, "state_name": "Bern" },
        { "country_id": 214, "state_name": "Canton Ticino" },
        { "country_id": 214, "state_name": "Fribourg" },
        { "country_id": 214, "state_name": "Geneve" },
        { "country_id": 214, "state_name": "Glarus" },
        { "country_id": 214, "state_name": "Graubunden" },
        { "country_id": 214, "state_name": "Heerbrugg" },
        { "country_id": 214, "state_name": "Jura" },
        { "country_id": 214, "state_name": "Kanton Aargau" },
        { "country_id": 214, "state_name": "Luzern" },
        { "country_id": 214, "state_name": "Morbio Inferiore" },
        { "country_id": 214, "state_name": "Muhen" },
        { "country_id": 214, "state_name": "Neuchatel" },
        { "country_id": 214, "state_name": "Nidwalden" },
        { "country_id": 214, "state_name": "Obwalden" },
        { "country_id": 214, "state_name": "Sankt Gallen" },
        { "country_id": 214, "state_name": "Schaffhausen" },
        { "country_id": 214, "state_name": "Schwyz" },
        { "country_id": 214, "state_name": "Solothurn" },
        { "country_id": 214, "state_name": "Thurgau" },
        { "country_id": 214, "state_name": "Ticino" },
        { "country_id": 214, "state_name": "Uri" },
        { "country_id": 214, "state_name": "Valais" },
        { "country_id": 214, "state_name": "Vaud" },
        { "country_id": 214, "state_name": "Vauffelin" },
        { "country_id": 214, "state_name": "Zug" },
        { "country_id": 214, "state_name": "Zurich" }
      ]
    },
    {
      "country_id": 215,
      "country_name": "Syria",
      "states": [
        { "country_id": 215, "state_name": "Aleppo" },
        { "country_id": 215, "state_name": "Dar'a" },
        { "country_id": 215, "state_name": "Dayr-az-Zawr" },
        { "country_id": 215, "state_name": "Dimashq" },
        { "country_id": 215, "state_name": "Halab" },
        { "country_id": 215, "state_name": "Hamah" },
        { "country_id": 215, "state_name": "Hims" },
        { "country_id": 215, "state_name": "Idlib" },
        { "country_id": 215, "state_name": "Madinat Dimashq" },
        { "country_id": 215, "state_name": "Tartus" },
        { "country_id": 215, "state_name": "al-Hasakah" },
        { "country_id": 215, "state_name": "al-Ladhiqiyah" },
        { "country_id": 215, "state_name": "al-Qunaytirah" },
        { "country_id": 215, "state_name": "ar-Raqqah" },
        { "country_id": 215, "state_name": "as-Suwayda" }
      ]
    },
    {
      "country_id": 216,
      "country_name": "Taiwan",
      "states": [
        { "country_id": 216, "state_name": "Changhua County" },
        { "country_id": 216, "state_name": "Chiayi County" },
        { "country_id": 216, "state_name": "Chiayi City" },
        { "country_id": 216, "state_name": "Taipei City" },
        { "country_id": 216, "state_name": "Hsinchu County" },
        { "country_id": 216, "state_name": "Hsinchu City" },
        { "country_id": 216, "state_name": "Hualien County" },
        { "country_id": 216, "state_name": "Kaohsiung City" },
        { "country_id": 216, "state_name": "Keelung City" },
        { "country_id": 216, "state_name": "Kinmen County" },
        { "country_id": 216, "state_name": "Miaoli County" },
        { "country_id": 216, "state_name": "Nantou County" },
        { "country_id": 216, "state_name": "Penghu County" },
        { "country_id": 216, "state_name": "Pingtung County" },
        { "country_id": 216, "state_name": "Taichung City" },
        { "country_id": 216, "state_name": "Tainan City" },
        { "country_id": 216, "state_name": "New Taipei City" },
        { "country_id": 216, "state_name": "Taitung County" },
        { "country_id": 216, "state_name": "Taoyuan City" },
        { "country_id": 216, "state_name": "Yilan County" },
        { "country_id": 216, "state_name": "YunLin County" },
        { "country_id": 216, "state_name": "Lienchiang County" }
      ]
    },
    {
      "country_id": 217,
      "country_name": "Tajikistan",
      "states": [
        { "country_id": 217, "state_name": "Dushanbe" },
        { "country_id": 217, "state_name": "Gorno-Badakhshan" },
        { "country_id": 217, "state_name": "Karotegin" },
        { "country_id": 217, "state_name": "Khatlon" },
        { "country_id": 217, "state_name": "Sughd" }
      ]
    },
    {
      "country_id": 218,
      "country_name": "Tanzania",
      "states": [
        { "country_id": 218, "state_name": "Arusha" },
        { "country_id": 218, "state_name": "Dar es Salaam" },
        { "country_id": 218, "state_name": "Dodoma" },
        { "country_id": 218, "state_name": "Iringa" },
        { "country_id": 218, "state_name": "Kagera" },
        { "country_id": 218, "state_name": "Kigoma" },
        { "country_id": 218, "state_name": "Kilimanjaro" },
        { "country_id": 218, "state_name": "Lindi" },
        { "country_id": 218, "state_name": "Mara" },
        { "country_id": 218, "state_name": "Mbeya" },
        { "country_id": 218, "state_name": "Morogoro" },
        { "country_id": 218, "state_name": "Mtwara" },
        { "country_id": 218, "state_name": "Mwanza" },
        { "country_id": 218, "state_name": "Pwani" },
        { "country_id": 218, "state_name": "Rukwa" },
        { "country_id": 218, "state_name": "Ruvuma" },
        { "country_id": 218, "state_name": "Shinyanga" },
        { "country_id": 218, "state_name": "Singida" },
        { "country_id": 218, "state_name": "Tabora" },
        { "country_id": 218, "state_name": "Tanga" },
        { "country_id": 218, "state_name": "Zanzibar and Pemba" }
      ]
    },
    {
      "country_id": 219,
      "country_name": "Thailand",
      "states": [
        { "country_id": 219, "state_name": "Amnat Charoen" },
        { "country_id": 219, "state_name": "Ang Thong" },
        { "country_id": 219, "state_name": "Bangkok" },
        { "country_id": 219, "state_name": "Buri Ram" },
        { "country_id": 219, "state_name": "Chachoengsao" },
        { "country_id": 219, "state_name": "Chai Nat" },
        { "country_id": 219, "state_name": "Chaiyaphum" },
        { "country_id": 219, "state_name": "Changwat Chaiyaphum" },
        { "country_id": 219, "state_name": "Chanthaburi" },
        { "country_id": 219, "state_name": "Chiang Mai" },
        { "country_id": 219, "state_name": "Chiang Rai" },
        { "country_id": 219, "state_name": "Chon Buri" },
        { "country_id": 219, "state_name": "Chumphon" },
        { "country_id": 219, "state_name": "Kalasin" },
        { "country_id": 219, "state_name": "Kamphaeng Phet" },
        { "country_id": 219, "state_name": "Kanchanaburi" },
        { "country_id": 219, "state_name": "Khon Kaen" },
        { "country_id": 219, "state_name": "Krabi" },
        { "country_id": 219, "state_name": "Krung Thep" },
        { "country_id": 219, "state_name": "Lampang" },
        { "country_id": 219, "state_name": "Lamphun" },
        { "country_id": 219, "state_name": "Loei" },
        { "country_id": 219, "state_name": "Lop Buri" },
        { "country_id": 219, "state_name": "Mae Hong Son" },
        { "country_id": 219, "state_name": "Maha Sarakham" },
        { "country_id": 219, "state_name": "Mukdahan" },
        { "country_id": 219, "state_name": "Nakhon Nayok" },
        { "country_id": 219, "state_name": "Nakhon Pathom" },
        { "country_id": 219, "state_name": "Nakhon Phanom" },
        { "country_id": 219, "state_name": "Nakhon Ratchasima" },
        { "country_id": 219, "state_name": "Nakhon Sawan" },
        { "country_id": 219, "state_name": "Nakhon Si Thammarat" },
        { "country_id": 219, "state_name": "Nan" },
        { "country_id": 219, "state_name": "Narathiwat" },
        { "country_id": 219, "state_name": "Nong Bua Lam Phu" },
        { "country_id": 219, "state_name": "Nong Khai" },
        { "country_id": 219, "state_name": "Nonthaburi" },
        { "country_id": 219, "state_name": "Pathum Thani" },
        { "country_id": 219, "state_name": "Pattani" },
        { "country_id": 219, "state_name": "Phangnga" },
        { "country_id": 219, "state_name": "Phatthalung" },
        { "country_id": 219, "state_name": "Phayao" },
        { "country_id": 219, "state_name": "Phetchabun" },
        { "country_id": 219, "state_name": "Phetchaburi" },
        { "country_id": 219, "state_name": "Phichit" },
        { "country_id": 219, "state_name": "Phitsanulok" },
        { "country_id": 219, "state_name": "Phra Nakhon Si Ayutthaya" },
        { "country_id": 219, "state_name": "Phrae" },
        { "country_id": 219, "state_name": "Phuket" },
        { "country_id": 219, "state_name": "Prachin Buri" },
        { "country_id": 219, "state_name": "Prachuap Khiri Khan" },
        { "country_id": 219, "state_name": "Ranong" },
        { "country_id": 219, "state_name": "Ratchaburi" },
        { "country_id": 219, "state_name": "Rayong" },
        { "country_id": 219, "state_name": "Roi Et" },
        { "country_id": 219, "state_name": "Sa Kaeo" },
        { "country_id": 219, "state_name": "Sakon Nakhon" },
        { "country_id": 219, "state_name": "Samut Prakan" },
        { "country_id": 219, "state_name": "Samut Sakhon" },
        { "country_id": 219, "state_name": "Samut Songkhran" },
        { "country_id": 219, "state_name": "Saraburi" },
        { "country_id": 219, "state_name": "Satun" },
        { "country_id": 219, "state_name": "Si Sa Ket" },
        { "country_id": 219, "state_name": "Sing Buri" },
        { "country_id": 219, "state_name": "Songkhla" },
        { "country_id": 219, "state_name": "Sukhothai" },
        { "country_id": 219, "state_name": "Suphan Buri" },
        { "country_id": 219, "state_name": "Surat Thani" },
        { "country_id": 219, "state_name": "Surin" },
        { "country_id": 219, "state_name": "Tak" },
        { "country_id": 219, "state_name": "Trang" },
        { "country_id": 219, "state_name": "Trat" },
        { "country_id": 219, "state_name": "Ubon Ratchathani" },
        { "country_id": 219, "state_name": "Udon Thani" },
        { "country_id": 219, "state_name": "Uthai Thani" },
        { "country_id": 219, "state_name": "Uttaradit" },
        { "country_id": 219, "state_name": "Yala" },
        { "country_id": 219, "state_name": "Yasothon" }
      ]
    },
    {
      "country_id": 220,
      "country_name": "Togo",
      "states": [
        { "country_id": 220, "state_name": "Centre" },
        { "country_id": 220, "state_name": "Kara" },
        { "country_id": 220, "state_name": "Maritime" },
        { "country_id": 220, "state_name": "Plateaux" },
        { "country_id": 220, "state_name": "Savanes" }
      ]
    },
    {
      "country_id": 221,
      "country_name": "Tokelau",
      "states": [
        { "country_id": 221, "state_name": "Atafu" },
        { "country_id": 221, "state_name": "Fakaofo" },
        { "country_id": 221, "state_name": "Nukunonu" }
      ]
    },
    {
      "country_id": 222,
      "country_name": "Tonga",
      "states": [
        { "country_id": 222, "state_name": "Eua" },
        { "country_id": 222, "state_name": "Ha'apai" },
        { "country_id": 222, "state_name": "Niuas" },
        { "country_id": 222, "state_name": "Tongatapu" },
        { "country_id": 222, "state_name": "Vava'u" }
      ]
    },
    {
      "country_id": 223,
      "country_name": "Trinidad And Tobago",
      "states": [
        { "country_id": 223, "state_name": "Arima-Tunapuna-Piarco" },
        { "country_id": 223, "state_name": "Caroni" },
        { "country_id": 223, "state_name": "Chaguanas" },
        { "country_id": 223, "state_name": "Couva-Tabaquite-Talparo" },
        { "country_id": 223, "state_name": "Diego Martin" },
        { "country_id": 223, "state_name": "Glencoe" },
        { "country_id": 223, "state_name": "Penal Debe" },
        { "country_id": 223, "state_name": "Point Fortin" },
        { "country_id": 223, "state_name": "Port of Spain" },
        { "country_id": 223, "state_name": "Princes Town" },
        { "country_id": 223, "state_name": "Saint George" },
        { "country_id": 223, "state_name": "San Fernando" },
        { "country_id": 223, "state_name": "San Juan" },
        { "country_id": 223, "state_name": "Sangre Grande" },
        { "country_id": 223, "state_name": "Siparia" },
        { "country_id": 223, "state_name": "Tobago" }
      ]
    },
    {
      "country_id": 224,
      "country_name": "Tunisia",
      "states": [
        { "country_id": 224, "state_name": "Aryanah" },
        { "country_id": 224, "state_name": "Bajah" },
        { "country_id": 224, "state_name": "Bin 'Arus" },
        { "country_id": 224, "state_name": "Binzart" },
        { "country_id": 224, "state_name": "Gouvernorat de Ariana" },
        { "country_id": 224, "state_name": "Gouvernorat de Nabeul" },
        { "country_id": 224, "state_name": "Gouvernorat de Sousse" },
        { "country_id": 224, "state_name": "Hammamet Yasmine" },
        { "country_id": 224, "state_name": "Jundubah" },
        { "country_id": 224, "state_name": "Madaniyin" },
        { "country_id": 224, "state_name": "Manubah" },
        { "country_id": 224, "state_name": "Monastir" },
        { "country_id": 224, "state_name": "Nabul" },
        { "country_id": 224, "state_name": "Qabis" },
        { "country_id": 224, "state_name": "Qafsah" },
        { "country_id": 224, "state_name": "Qibili" },
        { "country_id": 224, "state_name": "Safaqis" },
        { "country_id": 224, "state_name": "Sfax" },
        { "country_id": 224, "state_name": "Sidi Bu Zayd" },
        { "country_id": 224, "state_name": "Silyanah" },
        { "country_id": 224, "state_name": "Susah" },
        { "country_id": 224, "state_name": "Tatawin" },
        { "country_id": 224, "state_name": "Tawzar" },
        { "country_id": 224, "state_name": "Tunis" },
        { "country_id": 224, "state_name": "Zaghwan" },
        { "country_id": 224, "state_name": "al-Kaf" },
        { "country_id": 224, "state_name": "al-Mahdiyah" },
        { "country_id": 224, "state_name": "al-Munastir" },
        { "country_id": 224, "state_name": "al-Qasrayn" },
        { "country_id": 224, "state_name": "al-Qayrawan" }
      ]
    },
    {
      "country_id": 225,
      "country_name": "Turkey",
      "states": [
        { "country_id": 225, "state_name": "Adana" },
        { "country_id": 225, "state_name": "Adiyaman" },
        { "country_id": 225, "state_name": "Afyon" },
        { "country_id": 225, "state_name": "Agri" },
        { "country_id": 225, "state_name": "Aksaray" },
        { "country_id": 225, "state_name": "Amasya" },
        { "country_id": 225, "state_name": "Ankara" },
        { "country_id": 225, "state_name": "Antalya" },
        { "country_id": 225, "state_name": "Ardahan" },
        { "country_id": 225, "state_name": "Artvin" },
        { "country_id": 225, "state_name": "Aydin" },
        { "country_id": 225, "state_name": "Balikesir" },
        { "country_id": 225, "state_name": "Bartin" },
        { "country_id": 225, "state_name": "Batman" },
        { "country_id": 225, "state_name": "Bayburt" },
        { "country_id": 225, "state_name": "Bilecik" },
        { "country_id": 225, "state_name": "Bingol" },
        { "country_id": 225, "state_name": "Bitlis" },
        { "country_id": 225, "state_name": "Bolu" },
        { "country_id": 225, "state_name": "Burdur" },
        { "country_id": 225, "state_name": "Bursa" },
        { "country_id": 225, "state_name": "Canakkale" },
        { "country_id": 225, "state_name": "Cankiri" },
        { "country_id": 225, "state_name": "Corum" },
        { "country_id": 225, "state_name": "Denizli" },
        { "country_id": 225, "state_name": "Diyarbakir" },
        { "country_id": 225, "state_name": "Duzce" },
        { "country_id": 225, "state_name": "Edirne" },
        { "country_id": 225, "state_name": "Elazig" },
        { "country_id": 225, "state_name": "Erzincan" },
        { "country_id": 225, "state_name": "Erzurum" },
        { "country_id": 225, "state_name": "Eskisehir" },
        { "country_id": 225, "state_name": "Gaziantep" },
        { "country_id": 225, "state_name": "Giresun" },
        { "country_id": 225, "state_name": "Gumushane" },
        { "country_id": 225, "state_name": "Hakkari" },
        { "country_id": 225, "state_name": "Hatay" },
        { "country_id": 225, "state_name": "Icel" },
        { "country_id": 225, "state_name": "Igdir" },
        { "country_id": 225, "state_name": "Isparta" },
        { "country_id": 225, "state_name": "Istanbul" },
        { "country_id": 225, "state_name": "Izmir" },
        { "country_id": 225, "state_name": "Kahramanmaras" },
        { "country_id": 225, "state_name": "Karabuk" },
        { "country_id": 225, "state_name": "Karaman" },
        { "country_id": 225, "state_name": "Kars" },
        { "country_id": 225, "state_name": "Karsiyaka" },
        { "country_id": 225, "state_name": "Kastamonu" },
        { "country_id": 225, "state_name": "Kayseri" },
        { "country_id": 225, "state_name": "Kilis" },
        { "country_id": 225, "state_name": "Kirikkale" },
        { "country_id": 225, "state_name": "Kirklareli" },
        { "country_id": 225, "state_name": "Kirsehir" },
        { "country_id": 225, "state_name": "Kocaeli" },
        { "country_id": 225, "state_name": "Konya" },
        { "country_id": 225, "state_name": "Kutahya" },
        { "country_id": 225, "state_name": "Lefkosa" },
        { "country_id": 225, "state_name": "Malatya" },
        { "country_id": 225, "state_name": "Manisa" },
        { "country_id": 225, "state_name": "Mardin" },
        { "country_id": 225, "state_name": "Mugla" },
        { "country_id": 225, "state_name": "Mus" },
        { "country_id": 225, "state_name": "Nevsehir" },
        { "country_id": 225, "state_name": "Nigde" },
        { "country_id": 225, "state_name": "Ordu" },
        { "country_id": 225, "state_name": "Osmaniye" },
        { "country_id": 225, "state_name": "Rize" },
        { "country_id": 225, "state_name": "Sakarya" },
        { "country_id": 225, "state_name": "Samsun" },
        { "country_id": 225, "state_name": "Sanliurfa" },
        { "country_id": 225, "state_name": "Siirt" },
        { "country_id": 225, "state_name": "Sinop" },
        { "country_id": 225, "state_name": "Sirnak" },
        { "country_id": 225, "state_name": "Sivas" },
        { "country_id": 225, "state_name": "Tekirdag" },
        { "country_id": 225, "state_name": "Tokat" },
        { "country_id": 225, "state_name": "Trabzon" },
        { "country_id": 225, "state_name": "Tunceli" },
        { "country_id": 225, "state_name": "Usak" },
        { "country_id": 225, "state_name": "Van" },
        { "country_id": 225, "state_name": "Yalova" },
        { "country_id": 225, "state_name": "Yozgat" },
        { "country_id": 225, "state_name": "Zonguldak" }
      ]
    },
    {
      "country_id": 226,
      "country_name": "Turkmenistan",
      "states": [
        { "country_id": 226, "state_name": "Ahal" },
        { "country_id": 226, "state_name": "Asgabat" },
        { "country_id": 226, "state_name": "Balkan" },
        { "country_id": 226, "state_name": "Dasoguz" },
        { "country_id": 226, "state_name": "Lebap" },
        { "country_id": 226, "state_name": "Mari" }
      ]
    },
    {
      "country_id": 227,
      "country_name": "Turks And Caicos Islands",
      "states": [
        { "country_id": 227, "state_name": "Grand Turk" },
        { "country_id": 227, "state_name": "South Caicos and East Caicos" }
      ]
    },
    {
      "country_id": 228,
      "country_name": "Tuvalu",
      "states": [
        { "country_id": 228, "state_name": "Funafuti" },
        { "country_id": 228, "state_name": "Nanumanga" },
        { "country_id": 228, "state_name": "Nanumea" },
        { "country_id": 228, "state_name": "Niutao" },
        { "country_id": 228, "state_name": "Nui" },
        { "country_id": 228, "state_name": "Nukufetau" },
        { "country_id": 228, "state_name": "Nukulaelae" },
        { "country_id": 228, "state_name": "Vaitupu" }
      ]
    },
    {
      "country_id": 229,
      "country_name": "Uganda",
      "states": [
        { "country_id": 229, "state_name": "Central" },
        { "country_id": 229, "state_name": "Eastern" },
        { "country_id": 229, "state_name": "Northern" },
        { "country_id": 229, "state_name": "Western" }
      ]
    },
    {
      "country_id": 230,
      "country_name": "Ukraine",
      "states": [
        { "country_id": 230, "state_name": "Cherkas'ka" },
        { "country_id": 230, "state_name": "Chernihivs'ka" },
        { "country_id": 230, "state_name": "Chernivets'ka" },
        { "country_id": 230, "state_name": "Crimea" },
        { "country_id": 230, "state_name": "Dnipropetrovska" },
        { "country_id": 230, "state_name": "Donets'ka" },
        { "country_id": 230, "state_name": "Ivano-Frankivs'ka" },
        { "country_id": 230, "state_name": "Kharkiv" },
        { "country_id": 230, "state_name": "Kharkov" },
        { "country_id": 230, "state_name": "Khersonska" },
        { "country_id": 230, "state_name": "Khmel'nyts'ka" },
        { "country_id": 230, "state_name": "Kirovohrad" },
        { "country_id": 230, "state_name": "Krym" },
        { "country_id": 230, "state_name": "Kyyiv" },
        { "country_id": 230, "state_name": "Kyyivs'ka" },
        { "country_id": 230, "state_name": "L'vivs'ka" },
        { "country_id": 230, "state_name": "Luhans'ka" },
        { "country_id": 230, "state_name": "Mykolayivs'ka" },
        { "country_id": 230, "state_name": "Odes'ka" },
        { "country_id": 230, "state_name": "Odessa" },
        { "country_id": 230, "state_name": "Poltavs'ka" },
        { "country_id": 230, "state_name": "Rivnens'ka" },
        { "country_id": 230, "state_name": "Sevastopol" },
        { "country_id": 230, "state_name": "Sums'ka" },
        { "country_id": 230, "state_name": "Ternopil's'ka" },
        { "country_id": 230, "state_name": "Volyns'ka" },
        { "country_id": 230, "state_name": "Vynnyts'ka" },
        { "country_id": 230, "state_name": "Zakarpats'ka" },
        { "country_id": 230, "state_name": "Zaporizhia" },
        { "country_id": 230, "state_name": "Zhytomyrs'ka" }
      ]
    },
    {
      "country_id": 231,
      "country_name": "United Arab Emirates",
      "states": [
        { "country_id": 231, "state_name": "Abu Zabi" },
        { "country_id": 231, "state_name": "Ajman" },
        { "country_id": 231, "state_name": "Dubai" },
        { "country_id": 231, "state_name": "Ras al-Khaymah" },
        { "country_id": 231, "state_name": "Sharjah" },
        { "country_id": 231, "state_name": "Sharjha" },
        { "country_id": 231, "state_name": "Umm al Qaywayn" },
        { "country_id": 231, "state_name": "al-Fujayrah" },
        { "country_id": 231, "state_name": "ash-Shariqah" }
      ]
    },
    {
      "country_id": 232,
      "country_name": "United Kingdom",
      "states": [
        { "country_id": 232, "state_name": "Aberdeen" },
        { "country_id": 232, "state_name": "Aberdeenshire" },
        { "country_id": 232, "state_name": "Argyll" },
        { "country_id": 232, "state_name": "Armagh" },
        { "country_id": 232, "state_name": "Bedfordshire" },
        { "country_id": 232, "state_name": "Belfast" },
        { "country_id": 232, "state_name": "Berkshire" },
        { "country_id": 232, "state_name": "Birmingham" },
        { "country_id": 232, "state_name": "Brechin" },
        { "country_id": 232, "state_name": "Bridgnorth" },
        { "country_id": 232, "state_name": "Bristol" },
        { "country_id": 232, "state_name": "Buckinghamshire" },
        { "country_id": 232, "state_name": "Cambridge" },
        { "country_id": 232, "state_name": "Cambridgeshire" },
        { "country_id": 232, "state_name": "Channel Islands" },
        { "country_id": 232, "state_name": "Cheshire" },
        { "country_id": 232, "state_name": "Cleveland" },
        { "country_id": 232, "state_name": "Co Fermanagh" },
        { "country_id": 232, "state_name": "Conwy" },
        { "country_id": 232, "state_name": "Cornwall" },
        { "country_id": 232, "state_name": "Coventry" },
        { "country_id": 232, "state_name": "Craven Arms" },
        { "country_id": 232, "state_name": "Cumbria" },
        { "country_id": 232, "state_name": "Denbighshire" },
        { "country_id": 232, "state_name": "Derby" },
        { "country_id": 232, "state_name": "Derbyshire" },
        { "country_id": 232, "state_name": "Devon" },
        { "country_id": 232, "state_name": "Dial Code Dungannon" },
        { "country_id": 232, "state_name": "Didcot" },
        { "country_id": 232, "state_name": "Dorset" },
        { "country_id": 232, "state_name": "Dunbartonshire" },
        { "country_id": 232, "state_name": "Durham" },
        { "country_id": 232, "state_name": "East Dunbartonshire" },
        { "country_id": 232, "state_name": "East Lothian" },
        { "country_id": 232, "state_name": "East Midlands" },
        { "country_id": 232, "state_name": "East Sussex" },
        { "country_id": 232, "state_name": "East Yorkshire" },
        { "country_id": 232, "state_name": "England" },
        { "country_id": 232, "state_name": "Essex" },
        { "country_id": 232, "state_name": "Fermanagh" },
        { "country_id": 232, "state_name": "Fife" },
        { "country_id": 232, "state_name": "Flintshire" },
        { "country_id": 232, "state_name": "Fulham" },
        { "country_id": 232, "state_name": "Gainsborough" },
        { "country_id": 232, "state_name": "Glocestershire" },
        { "country_id": 232, "state_name": "Gwent" },
        { "country_id": 232, "state_name": "Hampshire" },
        { "country_id": 232, "state_name": "Hants" },
        { "country_id": 232, "state_name": "Herefordshire" },
        { "country_id": 232, "state_name": "Hertfordshire" },
        { "country_id": 232, "state_name": "Ireland" },
        { "country_id": 232, "state_name": "Isle Of Man" },
        { "country_id": 232, "state_name": "Isle of Wight" },
        { "country_id": 232, "state_name": "Kenford" },
        { "country_id": 232, "state_name": "Kent" },
        { "country_id": 232, "state_name": "Kilmarnock" },
        { "country_id": 232, "state_name": "Lanarkshire" },
        { "country_id": 232, "state_name": "Lancashire" },
        { "country_id": 232, "state_name": "Leicestershire" },
        { "country_id": 232, "state_name": "Lincolnshire" },
        { "country_id": 232, "state_name": "Llanymynech" },
        { "country_id": 232, "state_name": "London" },
        { "country_id": 232, "state_name": "Ludlow" },
        { "country_id": 232, "state_name": "Manchester" },
        { "country_id": 232, "state_name": "Mayfair" },
        { "country_id": 232, "state_name": "Merseyside" },
        { "country_id": 232, "state_name": "Mid Glamorgan" },
        { "country_id": 232, "state_name": "Middlesex" },
        { "country_id": 232, "state_name": "Mildenhall" },
        { "country_id": 232, "state_name": "Monmouthshire" },
        { "country_id": 232, "state_name": "Newton Stewart" },
        { "country_id": 232, "state_name": "Norfolk" },
        { "country_id": 232, "state_name": "North Humberside" },
        { "country_id": 232, "state_name": "North Yorkshire" },
        { "country_id": 232, "state_name": "Northamptonshire" },
        { "country_id": 232, "state_name": "Northants" },
        { "country_id": 232, "state_name": "Northern Ireland" },
        { "country_id": 232, "state_name": "Northumberland" },
        { "country_id": 232, "state_name": "Nottinghamshire" },
        { "country_id": 232, "state_name": "Oxford" },
        { "country_id": 232, "state_name": "Powys" },
        { "country_id": 232, "state_name": "Roos-shire" },
        { "country_id": 232, "state_name": "SUSSEX" },
        { "country_id": 232, "state_name": "Sark" },
        { "country_id": 232, "state_name": "Scotland" },
        { "country_id": 232, "state_name": "Scottish Borders" },
        { "country_id": 232, "state_name": "Shropshire" },
        { "country_id": 232, "state_name": "Somerset" },
        { "country_id": 232, "state_name": "South Glamorgan" },
        { "country_id": 232, "state_name": "South Wales" },
        { "country_id": 232, "state_name": "South Yorkshire" },
        { "country_id": 232, "state_name": "Southwell" },
        { "country_id": 232, "state_name": "Staffordshire" },
        { "country_id": 232, "state_name": "Strabane" },
        { "country_id": 232, "state_name": "Suffolk" },
        { "country_id": 232, "state_name": "Surrey" },
        { "country_id": 232, "state_name": "Sussex" },
        { "country_id": 232, "state_name": "Twickenham" },
        { "country_id": 232, "state_name": "Tyne and Wear" },
        { "country_id": 232, "state_name": "Tyrone" },
        { "country_id": 232, "state_name": "Utah" },
        { "country_id": 232, "state_name": "Wales" },
        { "country_id": 232, "state_name": "Warwickshire" },
        { "country_id": 232, "state_name": "West Lothian" },
        { "country_id": 232, "state_name": "West Midlands" },
        { "country_id": 232, "state_name": "West Sussex" },
        { "country_id": 232, "state_name": "West Yorkshire" },
        { "country_id": 232, "state_name": "Whissendine" },
        { "country_id": 232, "state_name": "Wiltshire" },
        { "country_id": 232, "state_name": "Wokingham" },
        { "country_id": 232, "state_name": "Worcestershire" },
        { "country_id": 232, "state_name": "Wrexham" },
        { "country_id": 232, "state_name": "Wurttemberg" },
        { "country_id": 232, "state_name": "Yorkshire" }
      ]
    },
    {
      "country_id": 233,
      "country_name": "United states Minor Outlying Islands",
      "states": [
        { "country_id": 233, "state_name": "United states Minor Outlying I" }
      ]
    },
    {
      "country_id": 234,
      "country_name": "Uruguay",
      "states": [
        { "country_id": 234, "state_name": "Artigas" },
        { "country_id": 234, "state_name": "Canelones" },
        { "country_id": 234, "state_name": "Cerro Largo" },
        { "country_id": 234, "state_name": "Colonia" },
        { "country_id": 234, "state_name": "Durazno" },
        { "country_id": 234, "state_name": "FLorida" },
        { "country_id": 234, "state_name": "Flores" },
        { "country_id": 234, "state_name": "Lavalleja" },
        { "country_id": 234, "state_name": "Maldonado" },
        { "country_id": 234, "state_name": "Montevideo" },
        { "country_id": 234, "state_name": "Paysandu" },
        { "country_id": 234, "state_name": "Rio Negro" },
        { "country_id": 234, "state_name": "Rivera" },
        { "country_id": 234, "state_name": "Rocha" },
        { "country_id": 234, "state_name": "Salto" },
        { "country_id": 234, "state_name": "San Jose" },
        { "country_id": 234, "state_name": "Soriano" },
        { "country_id": 234, "state_name": "Tacuarembo" },
        { "country_id": 234, "state_name": "Treinta y Tres" }
      ]
    },
    {
      "country_id": 235,
      "country_name": "Uzbekistan",
      "states": [
        { "country_id": 235, "state_name": "Andijon" },
        { "country_id": 235, "state_name": "Buhoro" },
        { "country_id": 235, "state_name": "Buxoro Viloyati" },
        { "country_id": 235, "state_name": "Cizah" },
        { "country_id": 235, "state_name": "Fargona" },
        { "country_id": 235, "state_name": "Horazm" },
        { "country_id": 235, "state_name": "Kaskadar" },
        { "country_id": 235, "state_name": "Korakalpogiston" },
        { "country_id": 235, "state_name": "Namangan" },
        { "country_id": 235, "state_name": "Navoi" },
        { "country_id": 235, "state_name": "Samarkand" },
        { "country_id": 235, "state_name": "Sirdare" },
        { "country_id": 235, "state_name": "Surhondar" },
        { "country_id": 235, "state_name": "Toskent" }
      ]
    },
    {
      "country_id": 236,
      "country_name": "Vanuatu",
      "states": [
        { "country_id": 236, "state_name": "Malampa" },
        { "country_id": 236, "state_name": "Penama" },
        { "country_id": 236, "state_name": "Sanma" },
        { "country_id": 236, "state_name": "Shefa" },
        { "country_id": 236, "state_name": "Tafea" },
        { "country_id": 236, "state_name": "Torba" }
      ]
    },
    {
      "country_id": 237,
      "country_name": "Vatican City State (Holy See)",
      "states": [
        { "country_id": 237, "state_name": "Vatican City State (Holy See)" }
      ]
    },
    {
      "country_id": 238,
      "country_name": "Venezuela",
      "states": [
        { "country_id": 238, "state_name": "Amazonas" },
        { "country_id": 238, "state_name": "Anzoategui" },
        { "country_id": 238, "state_name": "Apure" },
        { "country_id": 238, "state_name": "Aragua" },
        { "country_id": 238, "state_name": "Barinas" },
        { "country_id": 238, "state_name": "Bolivar" },
        { "country_id": 238, "state_name": "Carabobo" },
        { "country_id": 238, "state_name": "Cojedes" },
        { "country_id": 238, "state_name": "Delta Amacuro" },
        { "country_id": 238, "state_name": "Distrito Federal" },
        { "country_id": 238, "state_name": "Falcon" },
        { "country_id": 238, "state_name": "Guarico" },
        { "country_id": 238, "state_name": "Lara" },
        { "country_id": 238, "state_name": "Merida" },
        { "country_id": 238, "state_name": "Miranda" },
        { "country_id": 238, "state_name": "Monagas" },
        { "country_id": 238, "state_name": "Nueva Esparta" },
        { "country_id": 238, "state_name": "Portuguesa" },
        { "country_id": 238, "state_name": "Sucre" },
        { "country_id": 238, "state_name": "Tachira" },
        { "country_id": 238, "state_name": "Trujillo" },
        { "country_id": 238, "state_name": "Vargas" },
        { "country_id": 238, "state_name": "Yaracuy" },
        { "country_id": 238, "state_name": "Zulia" }
      ]
    },
    {
      "country_id": 239,
      "country_name": "Vietnam",
      "states": [
        { "country_id": 239, "state_name": "Bac Giang" },
        { "country_id": 239, "state_name": "Binh Dinh" },
        { "country_id": 239, "state_name": "Binh Duong" },
        { "country_id": 239, "state_name": "Da Nang" },
        { "country_id": 239, "state_name": "Dong Bang Song Cuu Long" },
        { "country_id": 239, "state_name": "Dong Bang Song Hong" },
        { "country_id": 239, "state_name": "Dong Nai" },
        { "country_id": 239, "state_name": "Dong Nam Bo" },
        { "country_id": 239, "state_name": "Duyen Hai Mien Trung" },
        { "country_id": 239, "state_name": "Hanoi" },
        { "country_id": 239, "state_name": "Hung Yen" },
        { "country_id": 239, "state_name": "Khu Bon Cu" },
        { "country_id": 239, "state_name": "Long An" },
        { "country_id": 239, "state_name": "Mien Nui Va Trung Du" },
        { "country_id": 239, "state_name": "Thai Nguyen" },
        { "country_id": 239, "state_name": "Thanh Pho Ho Chi Minh" },
        { "country_id": 239, "state_name": "Thu Do Ha Noi" },
        { "country_id": 239, "state_name": "Tinh Can Tho" },
        { "country_id": 239, "state_name": "Tinh Da Nang" },
        { "country_id": 239, "state_name": "Tinh Gia Lai" }
      ]
    },
    {
      "country_id": 240,
      "country_name": "Virgin Islands British)",
      "states": [
        { "country_id": 240, "state_name": "Anegada" },
        { "country_id": 240, "state_name": "Jost van Dyke" },
        { "country_id": 240, "state_name": "Tortola" }
      ]
    },
    {
      "country_id": 241,
      "country_name": "Virgin Islands US)",
      "states": [
        { "country_id": 241, "state_name": "Saint Croix" },
        { "country_id": 241, "state_name": "Saint John" },
        { "country_id": 241, "state_name": "Saint Thomas" }
      ]
    },
    {
      "country_id": 242,
      "country_name": "Wallis And Futuna Islands",
      "states": [
        { "country_id": 242, "state_name": "Alo" },
        { "country_id": 242, "state_name": "Singave" },
        { "country_id": 242, "state_name": "Wallis" }
      ]
    },
    {
      "country_id": 243,
      "country_name": "Western Sahara",
      "states": [
        { "country_id": 243, "state_name": "Bu Jaydur" },
        { "country_id": 243, "state_name": "Wad-adh-Dhahab" },
        { "country_id": 243, "state_name": "al-'Ayun" },
        { "country_id": 243, "state_name": "as-Samarah" }
      ]
    },
    {
      "country_id": 244,
      "country_name": "Yemen",
      "states": [
        { "country_id": 244, "state_name": "Adan" },
        { "country_id": 244, "state_name": "Abyan" },
        { "country_id": 244, "state_name": "Dhamar" },
        { "country_id": 244, "state_name": "Hadramaut" },
        { "country_id": 244, "state_name": "Hajjah" },
        { "country_id": 244, "state_name": "Hudaydah" },
        { "country_id": 244, "state_name": "Ibb" },
        { "country_id": 244, "state_name": "Lahij" },
        { "country_id": 244, "state_name": "Ma'rib" },
        { "country_id": 244, "state_name": "Madinat San'a" },
        { "country_id": 244, "state_name": "Sa'dah" },
        { "country_id": 244, "state_name": "Sana" },
        { "country_id": 244, "state_name": "Shabwah" },
        { "country_id": 244, "state_name": "Ta'izz" },
        { "country_id": 244, "state_name": "al-Bayda" },
        { "country_id": 244, "state_name": "al-Hudaydah" },
        { "country_id": 244, "state_name": "al-Jawf" },
        { "country_id": 244, "state_name": "al-Mahrah" },
        { "country_id": 244, "state_name": "al-Mahwit" }
      ]
    },
    {
      "country_id": 245,
      "country_name": "Yugoslavia",
      "states": [
        { "country_id": 245, "state_name": "Central Serbia" },
        { "country_id": 245, "state_name": "Kosovo and Metohija" },
        { "country_id": 245, "state_name": "Montenegro" },
        { "country_id": 245, "state_name": "Republic of Serbia" },
        { "country_id": 245, "state_name": "Serbia" },
        { "country_id": 245, "state_name": "Vojvodina" }
      ]
    },
    {
      "country_id": 246,
      "country_name": "Zambia",
      "states": [
        { "country_id": 246, "state_name": "Central" },
        { "country_id": 246, "state_name": "Copperbelt" },
        { "country_id": 246, "state_name": "Eastern" },
        { "country_id": 246, "state_name": "Luapala" },
        { "country_id": 246, "state_name": "Lusaka" },
        { "country_id": 246, "state_name": "North-Western" },
        { "country_id": 246, "state_name": "Northern" },
        { "country_id": 246, "state_name": "Southern" },
        { "country_id": 246, "state_name": "Western" }
      ]
    },
    {
      "country_id": 247,
      "country_name": "Zimbabwe",
      "states": [
        { "country_id": 247, "state_name": "Bulawayo" },
        { "country_id": 247, "state_name": "Harare" },
        { "country_id": 247, "state_name": "Manicaland" },
        { "country_id": 247, "state_name": "Mashonaland Central" },
        { "country_id": 247, "state_name": "Mashonaland East" },
        { "country_id": 247, "state_name": "Mashonaland West" },
        { "country_id": 247, "state_name": "Masvingo" },
        { "country_id": 247, "state_name": "Matabeleland North" },
        { "country_id": 247, "state_name": "Matabeleland South" },
        { "country_id": 247, "state_name": "Midlands" }
      ]
    }
  ]
  
//   countryData = [
//     { "country_id": 1, "country_name": "World Wide", "states": [] },
//     {
//   "country_id": 2,
//   "country_name": "United states",
//   "states": [
//     { "country_id": 2, "state_name": "Alabama" },
//     { "country_id": 2, "state_name": "Alaska" },
//     { "country_id": 2, "state_name": "Arizona" },
//     { "country_id": 2, "state_name": "Arkansas" },
//     { "country_id": 2, "state_name": "Byram" },
//     { "country_id": 2, "state_name": "California" },
//     { "country_id": 2, "state_name": "Cokato" },
//     { "country_id": 2, "state_name": "Colorado" },
//     { "country_id": 2, "state_name": "Connecticut" },
//     { "country_id": 2, "state_name": "Delaware" },
//     { "country_id": 2, "state_name": "District of Columbia" },
//     { "country_id": 2, "state_name": "Florida" },
//     { "country_id": 2, "state_name": "Georgia" },
//     { "country_id": 2, "state_name": "Hawaii" },
//     { "country_id": 2, "state_name": "Idaho" },
//     { "country_id": 2, "state_name": "Illinois" },
//     { "country_id": 2, "state_name": "Indiana" },
//     { "country_id": 2, "state_name": "Iowa" },
//     { "country_id": 2, "state_name": "Kansas" },
//     { "country_id": 2, "state_name": "Kentucky" },
//     { "country_id": 2, "state_name": "Louisiana" },
//     { "country_id": 2, "state_name": "Lowa" },
//     { "country_id": 2, "state_name": "Maine" },
//     { "country_id": 2, "state_name": "Maryland" },
//     { "country_id": 2, "state_name": "Massachusetts" },
//     { "country_id": 2, "state_name": "Medfield" },
//     { "country_id": 2, "state_name": "Michigan" },
//     { "country_id": 2, "state_name": "Minnesota" },
//     { "country_id": 2, "state_name": "Mississippi" },
//     { "country_id": 2, "state_name": "Missouri" },
//     { "country_id": 2, "state_name": "Montana" },
//     { "country_id": 2, "state_name": "Nebraska" },
//     { "country_id": 2, "state_name": "Nevada" },
//     { "country_id": 2, "state_name": "New Hampshire" },
//     { "country_id": 2, "state_name": "New Jersey" },
//     { "country_id": 2, "state_name": "New Jersy" },
//     { "country_id": 2, "state_name": "New Mexico" },
//     { "country_id": 2, "state_name": "New York" },
//     { "country_id": 2, "state_name": "North Carolina" },
//     { "country_id": 2, "state_name": "North Dakota" },
//     { "country_id": 2, "state_name": "Ohio" },
//     { "country_id": 2, "state_name": "Oklahoma" },
//     { "country_id": 2, "state_name": "Ontario" },
//     { "country_id": 2, "state_name": "Oregon" },
//     { "country_id": 2, "state_name": "Pennsylvania" },
//     { "country_id": 2, "state_name": "Ramey" },
//     { "country_id": 2, "state_name": "Rhode Island" },
//     { "country_id": 2, "state_name": "South Carolina" },
//     { "country_id": 2, "state_name": "South Dakota" },
//     { "country_id": 2, "state_name": "Sublimity" },
//     { "country_id": 2, "state_name": "Tennessee" },
//     { "country_id": 2, "state_name": "Texas" },
//     { "country_id": 2, "state_name": "Trimble" },
//     { "country_id": 2, "state_name": "Utah" },
//     { "country_id": 2, "state_name": "Vermont" },
//     { "country_id": 2, "state_name": "Virginia" },
//     { "country_id": 2, "state_name": "Washington" },
//     { "country_id": 2, "state_name": "West Virginia" },
//     { "country_id": 2, "state_name": "Wisconsin" },
//     { "country_id": 2, "state_name": "Wyoming" }
//   ]
// },
//     {
//   "country_id": 3,
//   "country_name": "Afghanistan",
//   "states": [
//   { "country_id": 3, "state_name": "Badakhshan" },
//   { "country_id": 3, "state_name": "Badgis" },
//   { "country_id": 3, "state_name": "Baglan" },
//   { "country_id": 3, "state_name": "Balkh" },
//   { "country_id": 3, "state_name": "Bamiyan" },
//   { "country_id": 3, "state_name": "Farah" },
//   { "country_id": 3, "state_name": "Faryab" },
//   { "country_id": 3, "state_name": "Gawr" },
//   { "country_id": 3, "state_name": "Gazni" },
//   { "country_id": 3, "state_name": "Herat" },
//   { "country_id": 3, "state_name": "Hilmand" },
//   { "country_id": 3, "state_name": "Jawzjan" },
//   { "country_id": 3, "state_name": "Kabul" },
//   { "country_id": 3, "state_name": "Kapisa" },
//   { "country_id": 3, "state_name": "Khawst" },
//   { "country_id": 3, "state_name": "Kunar" },
//   { "country_id": 3, "state_name": "Lagman" },
//   { "country_id": 3, "state_name": "Lawghar" },
//   { "country_id": 3, "state_name": "Nangarhar" },
//   { "country_id": 3, "state_name": "Nimruz" },
//   { "country_id": 3, "state_name": "Nuristan" },
//   { "country_id": 3, "state_name": "Paktika" },
//   { "country_id": 3, "state_name": "Paktiya" },
//   { "country_id": 3, "state_name": "Parwan" },
//   { "country_id": 3, "state_name": "Qandahar" },
//   { "country_id": 3, "state_name": "Qunduz" },
//   { "country_id": 3, "state_name": "Samangan" },
//   { "country_id": 3, "state_name": "Sar-e Pul" },
//   { "country_id": 3, "state_name": "Takhar" },
//   { "country_id": 3, "state_name": "Uruzgan" },
//   { "country_id": 3, "state_name": "Wardag" },
//   { "country_id": 3, "state_name": "Zabul" }
// ]
// }]
  // userDetails: any;
  cardData: any = [];

  constructor(
    private fb: FormBuilder,
    private as: ApiService,
    private utility: UtilityService,
    public dialogRef: MatDialogRef<PaymentPageComponent>
  ) {
  }

  ngOnInit(): void {
    // this.country = Object.values(countryData);
    this.country = this.countryData;
    this.createCardForm();
    this.user = this.as.getLocalStorage('userDetails');
    // this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.autoFocus();
  }

//   valid(date : any): any{
// // debugger
//     let today, someday;
//     let exMonth: any =document.getElementById("exMonth");
//     let exYear: any =document.getElementById("exYear");
//     today = new Date();
//     someday = new Date();
//     someday.setFullYear(exYear, exMonth - 1, someday.getDate());

//     if (someday < today) {
//       console.log('Please select a valid expiry date');
//       this.invalidExpiry = true;
//       // alert("The expiry date is before today's date. Please select a valid expiry date");
//       // return false;
//     }else{
//       this.invalidExpiry = false;
//       console.log('valid expiry date');
//     }
//   }
// 

// validateExp(){
//   let expire = document.getElementById('exp_date');
//   let error4 = document.getElementById('error4');
//   let d = new Date();
//     let currentYear = d.getFullYear();
//     let currentMonth = d.getMonth() + 1;
//     // get parts of the expiration date
//     let parts = expire.toString().split(/[-\/]+/);
//     let year = parseInt(parts[1], 10);
//     let month = parseInt(parts[0], 10);
//     // compare the dates
//     if (year < currentYear || (year == currentYear && month < currentMonth)) {
//       error4.innerHTML = "The expiry date has passed.\n";

//     }else if (month > 12){
//      error4.innerHTML = "Invalid month.\n";
//     };
//   };

  createCardForm(): void {
    this.addCardForm = this.fb.group({
      number: ['', [Validators.required]],
      exp_month: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX), Validators.min(3)]],
      cvc: ['', [Validators.required]],
      address_country: ['', [Validators.required]],
      address_zip: ['', [Validators.required]],
    });
  }

  validationFunc(type: string): boolean {
    // console.log('validationFunc', type);
    
    if (
      this.addCardForm.controls[type]?.touched &&
      this.addCardForm.controls[type]?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  filterExpiryDate(event: any) {
    // debugger
    let val = event.target.value;
    // console.log("VAL", val);

    let regex = val.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);

    // if (regex) {
    //   console.log("VALID format");
    // } else {
    //   console.log("INVALID format");
    // }

    var exp = new Date(
      this.checkFullYearFormat(1 * regex[2]),
      1 * regex[1] - 1,
      1
    ).valueOf();
    var now = new Date();
    var currMonth = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();
    if (exp <= currMonth) {
      this.invalidExpiry = true;
      // alert("Invalid Expiry Date. Date should be greater than current date");
    } else {
      // alert("Valid Expiry Date");
      this.invalidExpiry = false;
      console.log('Valid Expiry Date');
      
    }
  }

  checkFullYearFormat(yearVal: any) {
    var FIXED_YEAR = 20;
    if (yearVal < 100) {
      var nowYear = new Date().getFullYear();
      yearVal += Math.floor(nowYear / 100) * 100;
      if (yearVal > nowYear + FIXED_YEAR) {
        yearVal -= 100;
      } else if (yearVal <= nowYear - 100 + FIXED_YEAR) {
        yearVal += 100;
      }
    }
    return yearVal;
  }
  validateNo(e: any): boolean {
    // console.log('validateNo', e);
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  spaceAddFourChar(e: any): any {
    e.target.value = e.target.value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  minlengthFunc(type: string): boolean {
    // console.log('minlength', type);
    
    if (
      !this.addCardForm.controls[type]?.errors?.required &&
      this.addCardForm.controls[type]?.errors?.minlength
    ) {
      return true;
    } else {
      return false;
    }
  }

  addCardFunc(): void {
    // debugger
    this.addCardForm.value.number = this.addCardForm.get('number')?.value.replaceAll(' ', '');
    this.as
      .postApi('addPaymentMethod', {
        userId: this.user?._id,
        card: this.addCardForm.value,
      })
      .subscribe((next: any) => {
        if (!next.error) {
          this.user = next.user;
          this.dialogRef.close(next.user);
          // this.utility.notify(next.message.code, 'error');
        } else {
          // this.as.storeLocalStorage('userDetails', next.user);
          // this.user = next.user;
          // this.dialogRef.close(next.user);
          this.utility.notify(next.message.code, 'error');
        }
      });
  }


  monthCheck(e: any): void {
    // console.log('monthcheck', e);
    if (+e.target.value > 12) {
      e.target.value = '';
    }
  }
  autoFocus(): any { 
    const container: any = document.getElementById('autoFocus');
    container.onkeyup = function (e: any) {
      const target = e.srcElement || e.target;
      const maxLength = parseInt(target?.attributes.maxlength.value, 10);
      const myLength = target.value.length;
      if (myLength >= maxLength) {
        let next = target;
        while ((next = next.nextElementSibling)) {
          if (next == null) {
            break;
          }
          if (next.tagName.toLowerCase() === 'input') {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        let previous = target;
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) {
            break;
          }
          if (previous.tagName.toLowerCase() === 'input') {
            previous.focus();
            break;
          }
        }
      }
    };
  }
}

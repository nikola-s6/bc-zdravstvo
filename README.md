<h1 align="center">
Sistem za upravljanje zdravstvenim podacima pacijenata zasnovan na blockchain tehnologijama
</h1>

# Sadržaj

<details>
<summary>Prikazi sadržaj</summary>

1. [Uvod](#uvod)
   1. [Cilj](#cilj)
   2. [Verbalni opis sistema](#verbalni-opis-sistema)
      1. [Korisnički zahtevi](#korisnički-zahtevi)
      2. [Osnove funkcionisanja sistema](#osnove-funkcionisanja-sistema)
   3. [Slučajevi korišćenja](#slučajevi-korišćenja)
   4. [Prednosti integracije blockchain tehnologija](#prednosti-integracije-blockchain-tehnologija)

</details>

# Uvod

## Cilj

Cilj razvoja ovog sistema je da se zdravstvenim radnicima i pacijentima pruži platforma za čuvanje svih medicinskih podataka pacijenata na jednom mestu, tako da se može garantovati njihova autentičnost korišćenjem `blockchain` tehnologija.

## Verbalni opis sistema

### Korisnički zahtevi

<ins>**Zdravstvenim radnicima**</ins> (pre svega lekarima) je omogućen pristup sistemu pod jedninstvenom adresom,[^1] koja sluši za identifikaciju. Kada je lekar pristupio sistemu, ima mogućnost pregleda osnovnih podataka pacijenta i uvida u njegovu istoriju medicinskih zapisa. U pacijentovoj istoriji zabeleženi su svi prethodni pregledi, kontrole, terapije, bolesti, dijagnoze itd. Lekar može pristupiti svim pojedinačnim zapisima i tako ih detaljno pregledati. Nakon obavljenih novih pregleda lekar ima mogućnost kreiranja novog zapisa i njegovog trajnog dodavanja u pacijentovu istoriju u realnom vremenu.

[^1]: Jedinstveni heksadecimalni zapis duzine 42 karatkera koji počinje oznakom 0x. Predstavlja adresu digitalnog novčanika i ona je izvedena iz poslednjih 20 bajtova javnog ključa koji kontroliše nalog.

<ins>**Pacijentima**</ins> je takođe omogućen pristup korišćenjem jedinstvene adrese. Nakon prijave na sistem pacijent ima uvid u kompletnu istoriju medicinskih zapisa. Pacijent može detaljnije pogledati podatke za svaki zapis. Pacijentu je omogućen pregled samo sopstvene medicinske istorije, što znači da pacijent ne može pristupiti podacima drugih pacijenata. Korisnik nema mogućnost dodavanja novih zapisa.

### Osnove funkcionisanja sistema

Adrese koje se koriste za pristup sistemu su heksadecimalnog formata i predstavljaju adrese digitalnih novčanika. Svakom korisniku je dodeljena jedinstvena adresa koja njega direktno identifikuje. Korisnici se na sistem prijavljuju povezivanjem `metamask` novčanika sa sistemom i tako potvrđuju svoj identitet.

Sistem čine korsnici sa različitim nivoima pristupa. Pored osnovnih korisnika, **pacijenata i zdravstvenih radnika**, u sistemu se nalazi i **vlasnik pametnih ugovora**.[^2] Vlasnik pametnih ugovora je odgovoran za davanje kredencijala administratorima. **Administratori** imaju mogućnost kreiranja novih korisnika (pravljenje novih adresa i njihova dodela ljudima), kao i mogućnost davanja kredencijala lekarima.

[^2]: Adresa digitalnog novčanika koji je ugovore postavio na blockchain mrežu.

<center>

|                                           | Vlasnik pametnih ugovora | Administrator | Lekar | Pacijent |
| :---------------------------------------- | :----------------------: | :-----------: | :---: | :------: |
| Upravljanje kredencijalima administratora |            ✅            |      ❌       |  ❌   |    ❌    |
| Upravljanje kredencijalima lekara         |            ✅            |      ✅       |  ❌   |    ❌    |
| Kreiranje novih korisničkih naloga        |            ✅            |      ✅       |  ❌   |    ❌    |
| Pregled svih medicinskih zapisa           |            ✅            |      ✅       |  ✅   |    ❌    |
| Kreiranje novih medicinskih zapisa        |            ❌            |      ❌       |  ✅   |    ❌    |
| Pregled ličnih medicinksih zapisa         |            ❌            |      ❌       |  ✅   |    ✅    |

</center>

Svako novo dodavanje medicinskih zapisa je zabeleženo **transakcijama** na _blockchain-u_, a podaci ostaju zapisani u **pametnim ugovorima**, što olakšava kasniju pretragu. U elektronskim medicinskim zapisima smeštenim u pametnim ugovorima se čuvaju podaci o lekaru koji je obavio pregled, vremenu i lokaciji pregleda, vrsti pregleda, dijagnozi, preporučenoj terapiji itd. Zapisi takođe mogu sadržati slike i snimke.

> Beleženjem podataka u transakcijama i njihovim čuvanjem u pametnim ugovorima sprečava se izmena i brisanje podataka. Pametni ugovori pružaju uvid u funkcionisanje sistema i transparentnost implementiranih sistema bezbednosti što korisnicima pruža dodatni nivo sigurnosti.

## Slučajevi korišćenja

- Kreiranje korisničkog naloga
- Prijava korisnika na sistem
- Prikaz osnovnih podataka pacijenta
- Prikaz istorije medicinskih zapisa pacijenta
- Prikaz konkretnog zapisa sa svim pratećim podacima
- Kreiranje novih medicinskih zapisa
- Zakazivanje termina

## Prednosti integracije blockchain tehnologija

Korišćenjem `blockchain` tehnologija pre svega osigurava se autentičnost podataka, što je u slučaju zdravsvenih podataka jako važno. Takođe, olakšan je postupak sigurne identifikacije kako pacijenata, tako i lekara. Postupak integracije i pristupa kompletnim podacim znatno je olakšan korišćenjem ove tehnologije. Sve ovo dovodi do većeg poverenja pacijenata, olakšanog i sigurnijeg skladištenja podataka, integracije podataka, veće odgovornosti zdravstvenih radnika i interoperabilnost u radu.

import { Link } from "react-router-dom";

export default function TermsAndConditions() {
    return (
        <main className="terms-page">
            <div className="container">
                <div className="terms-header">
                    <Link to="/" className="btn btn-outline-secondary mb-3">← Torna alla Home</Link>
                    <h1>Termini e Condizioni</h1>
                    <p className="terms-update">Ultimo aggiornamento: Gennaio 2025</p>
                </div>

                <div className="terms-content">
                    <section className="terms-section">
                        <h2>1. Informazioni Generali</h2>
                        <p>
                            Benvenuto su Metal Games Solid Shop. Il presente documento regola l'utilizzo del sito web
                            e l'acquisto di prodotti attraverso la nostra piattaforma e-commerce dedicata a videogiochi retro,
                            console vintage, collezionabili e accessori gaming.
                        </p>
                        <p>
                            Effettuando un ordine sul nostro sito, l'utente accetta integralmente i presenti Termini e Condizioni.
                            Si prega di leggerli attentamente prima di procedere con qualsiasi acquisto.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>2. Definizioni</h2>
                        <ul>
                            <li><strong>"Venditore"</strong>: Metal Games Solid Shop</li>
                            <li><strong>"Cliente"</strong>: qualsiasi persona fisica o giuridica che effettua acquisti sul sito</li>
                            <li><strong>"Prodotti"</strong>: videogiochi, console, collezionabili e accessori disponibili per l'acquisto</li>
                            <li><strong>"Ordine"</strong>: la richiesta di acquisto inviata dal Cliente</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>3. Prodotti e Disponibilità</h2>
                        <p>
                            I prodotti venduti su Metal Games Solid Shop sono principalmente articoli usati, vintage o di seconda mano.
                            Ogni prodotto viene accuratamente testato e descritto nelle sue condizioni attuali.
                        </p>
                        <p>
                            La disponibilità dei prodotti è soggetta a variazioni. Nel caso in cui un prodotto ordinato
                            non fosse più disponibile, il Cliente verrà tempestivamente informato e rimborsato.
                        </p>
                        <p>
                            Le immagini dei prodotti sono puramente indicative. Per gli articoli usati,
                            potrebbero esserci lievi differenze estetiche rispetto alle foto.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>4. Prezzi e Pagamenti</h2>
                        <p>
                            Tutti i prezzi indicati sul sito sono in Euro (€) e includono l'IVA ove applicabile.
                        </p>
                        <p>
                            Le spese di spedizione, se previste, vengono calcolate e mostrate prima della conferma dell'ordine.
                        </p>
                        <p>
                            Il Venditore si riserva il diritto di modificare i prezzi in qualsiasi momento,
                            senza preavviso. Tuttavia, il prezzo applicato sarà quello visualizzato al momento dell'ordine.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>5. Ordini e Conferma</h2>
                        <p>
                            Per effettuare un ordine, il Cliente deve compilare correttamente tutti i campi richiesti
                            nel modulo di checkout, inclusi nome, cognome, email e indirizzo di spedizione completo.
                        </p>
                        <p>
                            Dopo l'invio dell'ordine, il Cliente riceverà una email di conferma all'indirizzo fornito.
                            L'ordine si considera accettato solo dopo l'invio di tale conferma.
                        </p>
                        <p>
                            Il Venditore si riserva il diritto di rifiutare ordini in caso di:
                        </p>
                        <ul>
                            <li>Dati di fatturazione o spedizione incompleti o errati</li>
                            <li>Prodotti non più disponibili</li>
                            <li>Sospetto di attività fraudolente</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>6. Spedizione e Consegna</h2>
                        <p>
                            I prodotti vengono spediti all'indirizzo indicato dal Cliente durante il checkout.
                            È responsabilità del Cliente fornire un indirizzo corretto e completo.
                        </p>
                        <p>
                            I tempi di consegna sono indicativi e possono variare in base alla destinazione
                            e al corriere utilizzato. Eventuali ritardi dovuti a cause di forza maggiore
                            non sono imputabili al Venditore.
                        </p>
                        <p>
                            Al momento della consegna, il Cliente è tenuto a verificare l'integrità del pacco.
                            In caso di danni visibili, si consiglia di accettare con riserva o rifiutare la consegna.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>7. Diritto di Recesso</h2>
                        <p>
                            Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), il Cliente consumatore ha diritto
                            di recedere dall'acquisto entro 14 giorni dalla ricezione del prodotto, senza dover
                            fornire alcuna motivazione.
                        </p>
                        <p>
                            Per esercitare il diritto di recesso, il Cliente deve inviare una comunicazione scritta
                            al Venditore entro il termine indicato.
                        </p>
                        <p>
                            Il prodotto deve essere restituito integro, nella confezione originale se presente,
                            e nelle stesse condizioni in cui è stato ricevuto. Le spese di restituzione sono a carico del Cliente.
                        </p>
                        <p>
                            Il rimborso verrà effettuato entro 14 giorni dal ricevimento del reso,
                            utilizzando lo stesso metodo di pagamento usato per l'acquisto.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>8. Garanzia</h2>
                        <p>
                            I prodotti nuovi sono coperti dalla garanzia legale di conformità di 24 mesi
                            ai sensi del Codice del Consumo.
                        </p>
                        <p>
                            Per i prodotti usati, la garanzia è di 12 mesi dalla data di consegna,
                            salvo diversa indicazione nella scheda prodotto.
                        </p>
                        <p>
                            La garanzia copre i difetti di conformità esistenti al momento della consegna
                            e non copre danni causati da uso improprio, negligenza o normale usura.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>9. Privacy e Protezione dei Dati</h2>
                        <p>
                            I dati personali forniti dal Cliente sono trattati in conformità al Regolamento UE 2016/679 (GDPR)
                            e alla normativa italiana sulla privacy.
                        </p>
                        <p>
                            I dati vengono utilizzati esclusivamente per:
                        </p>
                        <ul>
                            <li>Elaborare e gestire gli ordini</li>
                            <li>Inviare comunicazioni relative agli acquisti</li>
                            <li>Adempiere agli obblighi di legge</li>
                        </ul>
                        <p>
                            I dati non vengono ceduti a terzi per finalità di marketing senza il consenso esplicito del Cliente.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>10. Proprietà Intellettuale</h2>
                        <p>
                            Tutti i contenuti del sito (testi, immagini, loghi, grafica) sono di proprietà
                            di Metal Games Solid Shop o dei rispettivi titolari e sono protetti dalle leggi
                            sul diritto d'autore e sulla proprietà intellettuale.
                        </p>
                        <p>
                            È vietata la riproduzione, distribuzione o utilizzo non autorizzato dei contenuti del sito.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>11. Limitazione di Responsabilità</h2>
                        <p>
                            Il Venditore non è responsabile per danni indiretti, incidentali o consequenziali
                            derivanti dall'uso dei prodotti acquistati.
                        </p>
                        <p>
                            Il Venditore non è responsabile per eventuali interruzioni del servizio dovute
                            a manutenzione, problemi tecnici o cause di forza maggiore.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>12. Legge Applicabile e Foro Competente</h2>
                        <p>
                            I presenti Termini e Condizioni sono regolati dalla legge italiana.
                        </p>
                        <p>
                            Per qualsiasi controversia derivante dall'interpretazione o esecuzione dei presenti termini,
                            sarà competente il Foro del luogo di residenza o domicilio del consumatore,
                            se ubicato in Italia, ai sensi dell'art. 66-bis del Codice del Consumo.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>13. Modifiche ai Termini</h2>
                        <p>
                            Il Venditore si riserva il diritto di modificare i presenti Termini e Condizioni
                            in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione sul sito.
                        </p>
                        <p>
                            Si consiglia di consultare periodicamente questa pagina per essere aggiornati
                            su eventuali modifiche.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>14. Contatti</h2>
                        <p>
                            Per qualsiasi domanda, richiesta o reclamo relativo ai presenti Termini e Condizioni
                            o agli acquisti effettuati, il Cliente può contattarci tramite:
                        </p>
                        <ul>
                            <li>Email: supporto@metalgamessolidshop.com</li>
                        </ul>
                    </section>
                </div>

                <div className="terms-footer">
                    <p>Accettando i Termini e Condizioni durante il checkout, confermi di aver letto e compreso quanto sopra esposto.</p>
                    <Link to="/search" className="btn btn-primary">Vai allo Shop</Link>
                </div>
            </div>
        </main>
    );
}

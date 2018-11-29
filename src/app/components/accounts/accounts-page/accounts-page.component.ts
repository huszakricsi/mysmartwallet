import { Component, OnInit } from "@angular/core";
import { AccountService } from "../state/account.service";
import { AccountQuery } from "../state/account.query";
import { TranslateService } from "@ngx-translate/core";
import { createAccount } from "../state/account.model";
import { CurrencyQuery } from "../../currency/state/currency.query";
import { Account } from "../state/account.model";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-accounts-page",
  templateUrl: "./accounts-page.component.html",
  styleUrls: ["./accounts-page.component.css"]
})
export class AccountsPageComponent implements OnInit {
  new = createAccount({
    id: null,
    name: "Új bankkártyám",
    balance: 0,
    currency: "HUF"
  });
  underedit = createAccount({
    id: null,
    name: "Új bankkártyám",
    balance: 0,
    currency: "HUF"
  });

  constructor(
    public currencyQuery: CurrencyQuery,
    public accountQuery: AccountQuery,
    public accountService: AccountService,
    public translate: TranslateService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  delete(acc: Account) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { name: acc.name, nameConfirmation: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name == result.nameConfirmation) {
        this.accountService.deleteAccount(acc);
      }
      else{
        if (!!this.snackbar) {
          this.translate
            .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.ACCOUNTS.WRONGCONFIRMATION")
                .subscribe((msg: string) => {
                  this.snackbar.open(msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
      }
    });
  }
  save() {
    this.accountService.editAccount(this.underedit);
  }
  create(acc: Account) {
    this.accountService.createAccount(acc);
  }
  opened(acc: Account) {
    this.underedit.balance = acc.balance.valueOf();
    this.underedit.id = acc.id.valueOf();
    this.underedit.name = acc.name.valueOf();
  }
}

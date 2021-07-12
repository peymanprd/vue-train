<template>
    <div class="facture-wrap">
        <div class="stateModes"></div>
        <!-- Stuff Modal -->
        <div ref="stuffModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div
                        ref="stateModeToast"
                        class="toast align-items-center text-white bg-danger border-0 rounded-0 w-100"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        tabindex="1"
                    >
                        <div class="d-flex">
                            <div class="toast-body">
                                {{ modalAlert.message }}
                            </div>
                        </div>
                    </div>
                    <div v-if="stuff.dCount > 0" class="modal-header">
                        <h6 class="modal-title">
                            {{ stuff.Name }}
                        </h6>
                        <button
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                            @click="stuffModal.hide()"
                        ></button>
                    </div>

                    <div class="modal-body">
                        <div v-if="stuff.dCount > 0">
                            <div class="my-2">
                                <label for="stuff-unit">واحد</label>
                                <select
                                    class="form-select"
                                    v-model="stuff.dNumberSelect"
                                >
                                    <option
                                        v-if="stuff.bCanSellNoBox"
                                        :value="1"
                                    >
                                        {{ stuff.sUnit }}
                                    </option>
                                    <option
                                        v-if="stuff.bBox && stuff.bCanSellBox"
                                        :value="stuff.dNumberInBox"
                                    >
                                        {{ stuff.sBoxName }}
                                    </option>
                                    <option
                                        v-if="stuff.bBox2 && stuff.bCanSellBox2"
                                        :value="
                                            stuff.dNumberInBox *
                                                stuff.dNumberInBox2
                                        "
                                    >
                                        {{ stuff.sBoxName2 }}
                                    </option>
                                </select>
                            </div>
                            <BaseInput
                                label="تعداد"
                                v-model.number="stuff.Count"
                                type="number"
                                :max="stuff.dCount"
                            />
                        </div>
                        <div v-else class="text-danger mt-2">
                            موجودی کالای انتخاب شده صفر است
                        </div>
                    </div>
                    <div
                        v-if="stuff.dCount > 0"
                        class="modal-footer d-flex flex-row"
                    >
                        <button
                            @click="stuffModal.hide()"
                            type="button"
                            class="btn btn-light col"
                        >
                            انصراف
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary col"
                            @click="addStuffToFacture"
                        >
                            تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Edit Stuff Modal -->
        <div ref="editStuffModal" class="modal fade" tabindex="-2">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div
                        ref="stateModeToast"
                        class="toast align-items-center text-white bg-danger border-0 rounded-0 w-100"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        tabindex="1"
                    >
                        <div class="d-flex">
                            <div class="toast-body">
                                {{ modalAlert.message }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-header">
                        <h6 class="modal-title">
                            {{ stuff.Name }}
                        </h6>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="my-2">
                                <label class="text-secondary" for="stuff-unit"
                                    >واحد</label
                                >
                                <select
                                    class="form-select"
                                    v-model="editStuff.dNumberSelect"
                                >
                                    <option
                                        v-if="editStuff.bCanSellNoBox"
                                        :value="1"
                                    >
                                        {{ editStuff.sUnit }}
                                    </option>
                                    <option
                                        v-if="
                                            editStuff.bBox &&
                                                editStuff.bCanSellBox
                                        "
                                        :value="editStuff.dNumberInBox"
                                    >
                                        {{ editStuff.sBoxName }}
                                    </option>
                                    <option
                                        v-if="
                                            editStuff.bBox2 &&
                                                editStuff.bCanSellBox2
                                        "
                                        :value="
                                            editStuff.dNumberInBox *
                                                editStuff.dNumberInBox2
                                        "
                                    >
                                        {{ editStuff.sBoxName2 }}
                                    </option>
                                </select>
                            </div>
                            <BaseInput
                                label="تعداد"
                                v-model="editStuff.Count"
                                type="number"
                            />
                            <BaseInput
                                label="قیمت"
                                v-model="editStuff.dPrice"
                                type="number"
                            />
                            <div class="row">
                                <div class="col">
                                    <BaseInput
                                        label="تخفیف (درصدی)"
                                        @input="
                                            $filters.checkValue(
                                                $event,
                                                true,
                                                100
                                            )
                                        "
                                        v-model.number="editStuff.dDiscount"
                                        maxlength="100"
                                        type="number"
                                    />
                                </div>
                                <div class="col">
                                    <BaseInput
                                        label="مالیات (درصدی)"
                                        v-model="editStuff.dTax"
                                        type="number"
                                    />
                                </div>
                                <div class="col">
                                    <BaseInput
                                        label="عوارض (درصدی)"
                                        v-model="editStuff.dImposition"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <BaseInput
                                type="textarea"
                                label="توضیحات"
                                v-model="editStuff.sDesc"
                            />
                            <small>{{
                                'جمع کل : ' +
                                    stuffAmount(
                                        editStuff,
                                        finalCount(
                                            editStuff,
                                            unitRatio(editStuff)
                                        )
                                    ).toLocaleString()
                            }}</small>
                        </div>
                    </div>
                    <div class="modal-footer d-flex flex-row">
                        <button
                            @click="editStuffModal.hide()"
                            type="button"
                            class="btn btn-light col"
                        >
                            انصراف
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary col"
                            @click="editStuffinFacture"
                        >
                            تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- full facture Modal [Personnels / Cashes And Accounts] -->
        <div ref="fullModal" class="modal fade" tabindex="-2">
            <div
                class="modal-dialog modal-fullscreen-md-down modal-fullscreen-sm-down"
            >
                <div class="modal-content">
                    <!-- Header : Modal -->
                    <div v-if="stuffDetailsEvent" class="modal-header">
                        <h6 class="modal-title">
                            {{ `مشخصات کالا : ${stuff.Name}` }}
                        </h6>
                        <button
                            @click="fullModal.hide()"
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div v-if="personnelsEvent" class="modal-header">
                        <h6 class="modal-title">انتخاب پرسنل</h6>
                        <button
                            @click="fullModal.hide()"
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div v-if="cashesAndAccountsEvent" class="modal-header">
                        <h6 class="modal-title">فاکتور فروش</h6>
                        <button
                            @click="fullModal.hide()"
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div v-if="recipientsEvent" class="modal-header">
                        <h6 class="modal-title">دریافت کننده</h6>
                        <button
                            @click="viewCashAndAccounts()"
                            type="button"
                            class="btn"
                            aria-label="Close"
                        >
                            <BIconChevronLeft />
                        </button>
                    </div>
                    <!-- Body : Modal -->
                    <div v-if="stuffDetailsEvent" class="modal-body">
                        <div class="my-2">
                            <img
                                v-if="stuff.sPicture"
                                :src="'/img/stuffs/' + stuff.sPicture"
                                :alt="stuff.Name"
                                width="80"
                                class="mb-4"
                            />
                            <img
                                v-else
                                src="@/assets/images/stuff-img.png"
                                :alt="stuff.Name"
                                width="80"
                                class="mb-4"
                            />
                            <div class="stuff__details">
                                <p>{{ `نام کالا : ${stuff.Name}` }}</p>
                                <p>{{ `کد کالا : ${stuff.Code}` }}</p>
                                <p>{{ `تعداد : ${stuff.dCount}` }}</p>
                                <p>{{ `قیمت فروش : ${stuff.dPrice}` }}</p>
                                <p>{{ `بارکد کالا : ${stuff.sBarCode}` }}</p>
                                <p>{{ `واحد کالا : ${stuff.sUnit}` }}</p>
                                <p>{{ `توضیحات : ${stuff.sDesc}` }}</p>
                                <p>
                                    {{
                                        `عدد در کارتن : ${stuff.dNumberInBox *
                                            stuff.dNumberInBox2}`
                                    }}
                                </p>
                                <p>
                                    {{
                                        `قیمت مصرف کننده : ${stuff.dBaseSellPrice}`
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="personnelsEvent" class="modal-body">
                        <div>
                            <div class="my-2">
                                <label
                                    v-if="userSettings.sPersonnelTitle1"
                                    class="text-secondary"
                                    for="personnel__marketer"
                                >
                                    {{ userSettings.sPersonnelTitle1 }}
                                </label>
                                <select
                                    id="personnel__marketer"
                                    class="form-select"
                                    v-model="personnelsID.marketerID"
                                >
                                    <option value="0">-</option>
                                    <option
                                        v-for="marketer in marketers"
                                        :key="marketer.iID"
                                        :value="marketer.iID"
                                    >
                                        {{
                                            marketer.sName +
                                                ' ' +
                                                marketer.sLastName
                                        }}
                                    </option>
                                </select>
                                <label
                                    v-if="userSettings.sPersonnelTitle2"
                                    class="text-secondary"
                                    for="personnel__marketer"
                                >
                                    {{ userSettings.sPersonnelTitle2 }}
                                </label>
                                <select
                                    id="personnel__marketer"
                                    class="form-select"
                                    v-model="personnelsID.playerID"
                                >
                                    <option value="0">-</option>
                                    <option
                                        v-for="player in players"
                                        :key="player.iID"
                                        :value="player.iID"
                                    >
                                        {{
                                            player.sName +
                                                ' ' +
                                                player.sLastName
                                        }}
                                    </option>
                                </select>
                                <label
                                    v-if="userSettings.sPersonnelTitle3"
                                    class="text-secondary"
                                    for="personnel__marketer"
                                >
                                    {{ userSettings.sPersonnelTitle3 }}
                                </label>
                                <select
                                    id="personnel__marketer"
                                    class="form-select"
                                    v-model="personnelsID.receiptAgentID"
                                >
                                    <option value="0">-</option>
                                    <option
                                        v-for="receiptAgent in receiptAgents"
                                        :key="receiptAgent.iID"
                                        :value="receiptAgent.iID"
                                    >
                                        {{
                                            receiptAgent.sName +
                                                ' ' +
                                                receiptAgent.sLastName
                                        }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="cashesAndAccountsEvent" class="modal-body">
                        <div>
                            <div class="my-2">
                                <div
                                    class="cash-wrap d-flex flex-row align-items-center"
                                >
                                    <button
                                        @click="viewRecipients()"
                                        class="btn btn-dark align-self-center mx-2"
                                    >
                                        دریافت کننده
                                        <BIconPencilSquare />
                                    </button>
                                    <!-- <select
                                        v-model="factureData.iCashID"
                                        class="form-select"
                                        :disabled="!paidEvent"
                                    >
                                        <option
                                            v-for="cash in allCashes"
                                            :key="cash.iID"
                                            :value="cash.iID"
                                        >
                                            {{ cash.sName }}
                                        </option>
                                    </select> -->
                                </div>
                                <div class="end-sums my-4 text-center">
                                    <div>
                                        {{
                                            `مبلغ ناخالص فاکتور : ${getGrossFactureTotalCost.toLocaleString()} ریال`
                                        }}
                                    </div>
                                    <div>
                                        {{
                                            `تخفیف مبلغی : ${factureData.dDiscount.toLocaleString()}`
                                        }}
                                    </div>
                                    <div>
                                        {{
                                            `مالیات : % ${factureData.dTaxPercent.toLocaleString()}`
                                        }}
                                    </div>
                                    <div>
                                        {{
                                            `عوارض : % ${factureData.dImpositionPercent.toLocaleString()}`
                                        }}
                                    </div>
                                    <div>
                                        {{
                                            `کرایه حمل : ${factureData.dTransportRent.toLocaleString()}`
                                        }}
                                    </div>
                                    <div>
                                        {{
                                            `مبلغ کل : ${factureData.dSumAll.toLocaleString()} ریال`
                                        }}
                                    </div>
                                </div>
                                <hr class="divider my-4" />
                                <div
                                    v-if="!paidEvent"
                                    class="recipientsList text-center"
                                >
                                    <div
                                        v-if="
                                            cashID !== 0 &&
                                                cashesAndAccounts.cashAmount !==
                                                    0
                                        "
                                    >
                                        <small>{{
                                            `پرداخت با حساب ( ${cashName} ) به مبلغ : ${cashesAndAccounts.cashAmount.toLocaleString()} ریال`
                                        }}</small>
                                    </div>
                                    <div
                                        v-if="
                                            accountID !== 0 &&
                                                cashesAndAccounts.accountAmount1 !==
                                                    0
                                        "
                                    >
                                        <small>{{
                                            `پرداخت با کارت خوان ( ${poseName} ) به مبلغ : ${cashesAndAccounts.accountAmount1.toLocaleString()} ریال`
                                        }}</small>
                                    </div>
                                    <div
                                        v-if="
                                            accountID2 !== 0 &&
                                                cashesAndAccounts.accountAmount2 !==
                                                    0
                                        "
                                    >
                                        <small>{{
                                            `پرداخت با حساب ( ${accountName} ) به مبلغ : ${cashesAndAccounts.accountAmount2.toLocaleString()} ریال`
                                        }}</small>
                                    </div>
                                    <div
                                        v-if="
                                            accountID3 !== 0 &&
                                                cashesAndAccounts.accountAmount3 !==
                                                    0
                                        "
                                    >
                                        <small>{{
                                            `پرداخت با حواله ( ${havaleName} ) به مبلغ : ${cashesAndAccounts.accountAmount3.toLocaleString()} ریال`
                                        }}</small>
                                    </div>
                                </div>
                                <div>
                                    <BaseInput
                                        v-if="!paidEvent"
                                        v-model.number="factureSumPaid"
                                        label="مبلغ پرداخت نقدی"
                                        type="number"
                                        :disabled="!paidEvent"
                                    />
                                    <BaseInput
                                        v-model.number="factureNesieh"
                                        label="مبلغ نسیه"
                                        type="number"
                                        :disabled="!paidEvent"
                                    />
                                </div>
                                <form v-if="person.bCustomPerson">
                                    <div class="row">
                                        <div class="col">
                                            <BaseInput
                                                label="نام"
                                                v-model="
                                                    factureOtherPerson.sPersonName
                                                "
                                                maxlength="36"
                                                :required="
                                                    factureOtherPerson.required
                                                "
                                            />
                                        </div>
                                        <div class="col">
                                            <BaseInput
                                                label="موبایل"
                                                v-model="
                                                    factureOtherPerson.sPersonTel
                                                "
                                                @keypress="
                                                    $filters.isNumber($event)
                                                "
                                                maxlength="11"
                                                :required="
                                                    factureOtherPerson.required
                                                "
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <BaseInput
                                            label="آدرس"
                                            v-model="
                                                factureOtherPerson.sPersonAddress
                                            "
                                        />
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <BaseInput
                                                label="کد ملی"
                                                v-model="
                                                    factureOtherPerson.sPersonNationalCode
                                                "
                                                @keypress="
                                                    $filters.isNumber($event)
                                                "
                                                maxlength="10"
                                            />
                                        </div>
                                        <div class="col">
                                            <BaseInput
                                                label="کد پستی"
                                                v-model="
                                                    factureOtherPerson.sPersonPostCode
                                                "
                                                @keypress="
                                                    $filters.isNumber($event)
                                                "
                                                maxlength="10"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <BaseInput
                                            label="شماره تلفن"
                                            v-model="
                                                factureOtherPerson.sPersonTel2
                                            "
                                            @keypress="
                                                $filters.isNumber($event)
                                            "
                                            maxlength="12"
                                        />
                                    </div>
                                </form>
                                <div
                                    v-if="recipientsError.status"
                                    class="py-2 px-4 bg-dark text-white rounded shadow-lg position-absolute bottom-20 start-50 translate-middle-x"
                                >
                                    {{ recipientsError.message }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="recipientsEvent" class="modal-body">
                        <h6 class="text-center" style="marginBottom: 24px">
                            نحوه پرداخت را مشخص کنید
                        </h6>
                        <div class="mt-4">
                            <div class="cash-items row align-items-center g-3">
                                <div class="col m-0">
                                    <select
                                        v-model.number="cashID"
                                        class="form-select"
                                    >
                                        <option value="0">انتخاب صندوق</option>
                                        <option
                                            v-for="cash in cashes"
                                            :key="cash.iID"
                                            :value="cash.iID"
                                        >
                                            {{ cash.sName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-7 m-0">
                                    <BaseInput
                                        v-model.number="
                                            cashesAndAccounts.cashAmount
                                        "
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div
                                class="card-items row align-items-center g-3 my-1"
                            >
                                <div class="col m-0">
                                    <select
                                        v-model.number="accountID"
                                        class="form-select"
                                    >
                                        <option value="0"
                                            >انتخاب کارت خوان</option
                                        >
                                        <option
                                            v-for="pose in accountsPose"
                                            :key="pose.iID"
                                            :value="pose.iID"
                                        >
                                            {{ pose.sName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-7 m-0">
                                    <BaseInput
                                        v-model.number="
                                            cashesAndAccounts.accountAmount1
                                        "
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div
                                class="account-items row align-items-center g-3 my-1"
                            >
                                <div class="col m-0">
                                    <select
                                        v-model.number="accountID2"
                                        class="form-select"
                                    >
                                        <option value="0">انتخاب حساب</option>
                                        <option
                                            v-for="account in accounts"
                                            :key="account.iID"
                                            :value="account.iID"
                                        >
                                            {{ account.sName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-7 m-0">
                                    <BaseInput
                                        v-model.number="
                                            cashesAndAccounts.accountAmount2
                                        "
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div
                                class="account-items row align-items-center g-3 my-1"
                            >
                                <div class="col m-0">
                                    <select
                                        v-model.number="accountID3"
                                        class="form-select"
                                    >
                                        <option value="0">انتخاب حواله</option>
                                        <option
                                            v-for="account in accounts"
                                            :key="account.iID"
                                            :value="account.iID"
                                        >
                                            {{ account.sName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-7 m-0">
                                    <BaseInput
                                        v-model.number="
                                            cashesAndAccounts.accountAmount3
                                        "
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div>
                                <p>
                                    {{
                                        `مبلغ فاکتور : ${factureData.dSumAll.toLocaleString()}`
                                    }}
                                </p>
                                <p>
                                    {{
                                        `مانده از این فاکتور : ${remainingFacture.toLocaleString()}`
                                    }}
                                </p>
                            </div>
                            <div
                                class="bg-light border p-2 text-center text-primary rounded my-2"
                            >
                                {{
                                    sumCashAndAccountsAmount
                                        ? 'مجموع : ' +
                                          sumCashAndAccountsAmount.toLocaleString()
                                        : 'مجموع : ' + 0
                                }}
                            </div>
                        </div>
                        <div
                            v-if="recipientsError.status"
                            class="py-2 px-4 bg-dark text-white rounded shadow-lg position-absolute bottom-20 start-50 translate-middle-x"
                        >
                            {{ recipientsError.message }}
                        </div>
                    </div>
                    <!-- Footer : Modal -->
                    <div
                        v-if="personnelsEvent"
                        class="modal-footer d-flex flex-row"
                    >
                        <button
                            @click="setPersonnels"
                            type="button"
                            class="btn btn-primary col"
                        >
                            تایید
                        </button>
                    </div>
                    <div
                        v-if="cashesAndAccountsEvent"
                        class="modal-footer d-flex flex-row"
                    >
                        <button
                            @click.prevent="registerFacture"
                            type="button"
                            class="btn btn-primary col"
                        >
                            ثبت نهایی فاکتور
                        </button>
                    </div>
                    <div
                        v-if="recipientsEvent"
                        class="modal-footer d-flex flex-row"
                    >
                        <button
                            @click="setRecipients"
                            type="button"
                            class="btn btn-primary col"
                        >
                            تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- facture Description Modal -->
        <div ref="descModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title">توضیحات فاکتور</h6>
                        <button
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                            @click="descModal.hide()"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <textarea
                                class="form-control"
                                placeholder="..."
                                v-model="factureDesc"
                            ></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            @click="setDescription"
                            type="button"
                            class="btn btn-primary col"
                        >
                            تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- filter options canvas -->
        <div
            ref="filterOptionsCanvas"
            class="offcanvas offcanvas-bottom filterOptions"
            tabindex="-1"
            id="getStuffsStoreOptions"
            aria-labelledby="offcanvasBottomLabel"
        >
            <div class="offcanvas-header">
                <h6 class="offcanvas-title" id="offcanvasBottomLabel">
                    فیلتر بر اساس
                </h6>
                <button
                    type="button"
                    class="btn-close text-reset"
                    aria-label="Close"
                    @click="filterOptionsCanvas.hide()"
                ></button>
            </div>
            <div class="offcanvas-body full-height">
                <div>
                    <input
                        type="checkbox"
                        v-model="stuffsStock"
                        class="btn-check"
                        id="btn-check-outlined"
                        autocomplete="off"
                    />
                    <label
                        class="btn btn-outline-primary"
                        for="btn-check-outlined"
                        >فقط کالاهای موجود</label
                    >
                </div>
                <div class="d-grid gap-2 mt-4">
                    <button
                        @click.prevent="getStuffsStore"
                        class="btn btn-primary"
                    >
                        اعمال فیلتر
                    </button>
                </div>
            </div>
        </div>
        <!-- store filter canvas -->
        <div
            ref="getStoresCanvas"
            class="offcanvas offcanvas-bottom getStores"
            id="getStores"
            aria-labelledby="offcanvasBottomLabel"
        >
            <div class="offcanvas-header">
                <button
                    type="button"
                    class="btn-close text-reset"
                    aria-label="Close"
                    @click="getStoresCanvas.hide()"
                ></button>
            </div>
            <div class="offcanvas-body full-height">
                <BaseInput
                    placeholder="جستجو بر اساس نام و کد انبار"
                    @input.stop="getStores"
                    v-model="storeSearchKey"
                />
                <div class="list-group mt-1">
                    <a
                        v-for="(store, index) in stores"
                        :key="index"
                        @click.prevent="selectStoreinStuffList(store)"
                        href="#"
                        class="list-group-item"
                        aria-current="true"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ store.sName }}</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- facture footer canvas -->
        <div
            ref="factureFooterCanvas"
            class="offcanvas offcanvas-bottom rounded-top"
            tabindex="-1"
            id="offcanvasBottom"
            aria-labelledby="offcanvasBottomLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasBottomLabel">
                    اطلاعات فاکتور
                </h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    @click="factureFooterCanvas.hide()"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body small">
                <div class="text-center">
                    <p>
                        {{
                            getSumAll
                                ? 'مبلغ کل :  ' +
                                  Number(getSumAll).toLocaleString() +
                                  ' ریال'
                                : ''
                        }}
                    </p>
                    <p>
                        {{ 'جمع اقلام : ' + getFactureTotalCount }}
                    </p>
                    <p>
                        {{ 'جمع ردیف : ' + factureData.stuffs.length }}
                    </p>
                </div>
                <div class="row">
                    <BaseInput
                        v-model.number="factureFinalize.dDiscount"
                        label="تخفیف مبلغی"
                        type="number"
                    />
                    <BaseInput
                        v-model.number="factureFinalize.dTaxPercent"
                        label="مالیات (درصد)"
                        type="number"
                    />
                    <BaseInput
                        v-model.number="factureFinalize.dImpositionPercent"
                        label="عوارض (درصد)"
                        type="number"
                    />
                    <BaseInput
                        v-model.number="factureFinalize.dTransportRent"
                        label="کرایه حمل"
                        type="number"
                    />
                </div>
                <div class="d-grid gap-2">
                    <button @click="finalizeFacture" class="btn btn-primary">
                        ادامه
                    </button>
                </div>
            </div>
        </div>

        <!-- facture stuff toast -->
        <div
            v-show="0"
            ref="notice"
            class="toast align-items-center text-white bg-success border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div class="d-flex">
                <div class="toast-body">کالا با موفقیت به فاکتور اضافه شد.</div>
            </div>
        </div>

        <div class="row">
            <div
                v-if="alert.state && !modalAlert.isVisible"
                class="alert alert-danger border-0 w-100"
                role="alert"
            >
                {{ alert.message }}
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>
                    {{
                        config.show
                            ? `فاکتور فروش به شماره : ${factureNumber}`
                            : ''
                    }}
                </span>
                <span>
                    {{
                        config.show
                            ? $filters.toJalaali(factureData.date, false, true)
                            : ''
                    }}
                </span>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <button
                        v-if="config.show"
                        @click="
                            ;(config.addItemEvent = true) &&
                                (config.show = false)
                        "
                        class="btn btn-light"
                    >
                        {{
                            person.fullName
                                ? person.fullName
                                : 'انتخاب طرف حساب'
                        }}
                        <BIconPlus />
                    </button>
                </div>
                <div v-if="config.show">
                    <button
                        @click="clearFacture"
                        class="btn btn-link btn-sm pl-4"
                    >
                        <BIconEraser /> پاک کردن همه
                    </button>
                    <button
                        @click="
                            ;(config.addStoreEvent = true) &&
                                (config.show = false)
                        "
                        class="btn btn-light"
                    >
                        {{ store.sName ? store.sName : 'انتخاب انبار +' }}
                    </button>
                </div>
            </div>
            <div v-if="config.addItemEvent" class="f-person col">
                <div class="select__stuff d-flex justify-content-between">
                    <h6>انتخاب طرف حساب</h6>
                    <button
                        @click="initConfig"
                        class="btn btn-outline-primary btn-sm"
                    >
                        <BIconChevronLeft />
                    </button>
                </div>
                <BaseInput
                    placeholder="جستجو بر اساس نام و شماره تلفن"
                    @keyup.stop="getPersons"
                    v-model="personSearchKey"
                />
                <div v-if="!isLoading" class="list-group list-group-flush mt-1">
                    <Person
                        v-for="(person, index) in persons"
                        :key="index"
                        :person="person"
                        :factureData="factureData"
                        @selectPerson="selectPerson(person)"
                        class="list-group-item"
                        :aria-current="config.isActive"
                    />
                </div>
                <div v-else class="d-flex justify-content-center my-4">
                    <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                    ></div>
                </div>
            </div>
            <div v-if="config.addStoreEvent" class="f-store col">
                <div class="select__stuff d-flex justify-content-between">
                    <h6>انتخاب انبار</h6>
                    <button
                        @click="initConfig"
                        class="btn btn-outline-primary btn-sm"
                    >
                        <BIconChevronLeft />
                    </button>
                </div>
                <BaseInput
                    placeholder="جستجو بر اساس نام یا کد انبار"
                    @keyup.stop="getStores"
                    v-model="storeSearchKey"
                />
                <div v-if="!isLoading" class="list-group mt-1">
                    <a
                        v-for="(store, index) in stores"
                        :key="index"
                        @click.prevent="selectStore(store)"
                        href="#"
                        class="list-group-item"
                        aria-current="true"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ store.sName }}</h5>
                        </div>
                    </a>
                </div>
                <div v-else class="d-flex justify-content-center my-4">
                    <div class="spinner-border" role="status"></div>
                </div>
            </div>
            <div v-if="config.addStuffEvent" class="f-stuff sticky-top col">
                <div class="select__stuff d-flex justify-content-between">
                    <h6>انتخاب کالا</h6>
                    <button
                        @click="initConfig"
                        class="btn btn-outline-primary btn-sm"
                    >
                        <BIconChevronLeft />
                    </button>
                </div>
                <BaseInput
                    placeholder="جستجو در انبار بر اساس نام یا کد کالا یا بارکد"
                    @keyup.stop="getStuffsStore"
                    v-model="stuffSearchKey"
                />
                <div class="filter-options my-2">
                    <div class="fixed-bottom p-3">
                        <button
                            class="btn btn-primary btn-lg rounded-circle shadow-lg"
                            type="button"
                            data-bs-target="#getStuffsStoreOptions"
                            @click="filterOptionsCanvas.show()"
                            aria-controls="offcanvasBottom"
                        >
                            <BIconFunnelFill />
                        </button>
                    </div>
                    <div
                        class="row d-flex justify-content-between align-items-center"
                    >
                        <div
                            data-bs-target="#getStores"
                            @click="getStoresCanvas.show()"
                        >
                            {{
                                storeInStuffList.sName
                                    ? storeInStuffList.sName
                                    : store.sName
                            }}
                        </div>
                        <div v-if="config.stuffFirstClassEvent" class="col">
                            <div
                                v-for="stuffFirstClass in stuffFirstClassGroup"
                                :key="stuffFirstClass.iID"
                                class="btn-group btn-group-sm mx-1"
                                role="group"
                                aria-label="Basic outlined example"
                            >
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary"
                                    @click.prevent="
                                        stuffSecondClass(
                                            stuffFirstClass.iID,
                                            stuffFirstClass.sName
                                        )
                                    "
                                >
                                    {{ stuffFirstClass.sName }}
                                </button>
                            </div>
                        </div>
                        <div
                            v-else-if="config.stuffSecondClassEvent"
                            class="col"
                        >
                            <div
                                v-for="stuffSecondClass in stuffSecondClassGroup"
                                :key="stuffSecondClass.iID"
                                class="btn-group btn-group-sm"
                                role="group"
                                aria-label="Basic outlined example"
                            >
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary mx-1"
                                    @click.prevent="
                                        stuffThirdClass(
                                            stuffSecondClass.iID,
                                            stuffSecondClass.sName
                                        )
                                    "
                                >
                                    {{ stuffSecondClass.sName }}
                                </button>
                            </div>
                        </div>
                        <div v-else class="col">
                            <div
                                v-for="stuffThirdClass in stuffThirdClassGroup"
                                :key="stuffThirdClass.iID"
                                class="btn-group btn-group-sm"
                                role="group"
                                aria-label="Basic outlined example"
                            >
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary mx-1"
                                >
                                    {{ stuffThirdClass.sName }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <nav aria-label="breadcrumb">
                                <ol
                                    class="breadcrumb mb-0 p-2"
                                    style="--bs-breadcrumb-divider: '&#9666;'"
                                    aria-label="breadcrumb"
                                >
                                    <li class="breadcrumb-item">
                                        <a
                                            class="fw-lighter"
                                            @click="
                                                ;[
                                                    stuffFirstClass,
                                                    (stuffSingleClass.sName = null),
                                                    (stuffSingleClass.iID = null),
                                                    stuffSecondSingleClass.sName ||
                                                    stuffSecondSingleClass.iID
                                                        ? (stuffSecondSingleClass.sName = null) &&
                                                          (stuffSecondSingleClass.iID = null)
                                                        : false,
                                                ]
                                            "
                                            href="#"
                                            >تمام گروه ها</a
                                        >
                                    </li>
                                    <li
                                        v-if="stuffSingleClass.sName"
                                        class="breadcrumb-item"
                                    >
                                        <a
                                            @click="
                                                stuffSecondClass,
                                                    (stuffSecondSingleClass.sName = null),
                                                    (stuffSecondSingleClass.iID = null)
                                            "
                                            href="#"
                                            >{{ stuffSingleClass.sName }}</a
                                        >
                                    </li>
                                    <li
                                        v-if="stuffSecondSingleClass.sName"
                                        class="breadcrumb-item"
                                    >
                                        <a @click="stuffThirdClass" href="#">{{
                                            stuffSecondSingleClass.sName
                                        }}</a>
                                    </li>
                                    <li
                                        v-if="stuffThirdSingleClass.sName"
                                        class="breadcrumb-item"
                                        aria-current="page"
                                    >
                                        {{ stuffThirdSingleClass.sName }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div v-if="!isLoading" class="stuffs__List list-group mt-1">
                    <Stuff
                        v-for="(stuff, index) in stuffs"
                        :key="index"
                        :stuff="stuff"
                        @stuffDetailsModal="
                            targetStuff(stuff, true), viewStuffDetails()
                        "
                        :factureData="factureData"
                        @addStuffModal="
                            targetStuff(stuff, true),
                                [
                                    stuffModal.show(),
                                    (modalAlert.isVisible = true),
                                ]
                        "
                        class="list-group-item"
                    />
                </div>
                <div v-else class="d-flex justify-content-center my-4">
                    <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                    ></div>
                </div>
                <div v-if="config.addFilterEvent" class="filter col">
                    <input
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined"
                        autocomplete="off"
                    />
                    <label
                        class="btn btn-outline-primary"
                        for="btn-check-outlined"
                        >فقط کالاهای موجود</label
                    ><br />
                </div>
            </div>
        </div>
        <div class="factureData-wrap">
            <div v-if="config.show" class="list-group mt-1">
                <div
                    v-for="(aStuff, index) in factureData.stuffs"
                    :key="index"
                    class="stuff list-group-item d-flex w-100 justify-content-start"
                >
                    <div class="stuff-img-wrap d-flex">
                        <img
                            v-if="aStuff.sPicture"
                            :src="'/img/stuffs/' + aStuff.sPicture"
                            class="stuff__img"
                        />
                        <img
                            v-else
                            src="@/assets/images/stuff-img.png"
                            class="stuff__img"
                        />
                    </div>

                    <div class="stuff__body d-flex flex-column flex-grow-1">
                        <h5 class="mb-1">
                            {{ aStuff.Name }}
                            <small class="badge bg-light text-secondary">{{
                                'کد ' + aStuff.Code
                            }}</small>
                            <i class="mx-2" style="font-size: 12px">{{
                                'انبار : ' + aStuff.iStoreID
                            }}</i>
                        </h5>
                        <span class="text-primary">{{
                            'جمع کل : ' +
                                aStuff.dAmount.toLocaleString() +
                                ' ریال'
                        }}</span>
                        <small class="text-muted"
                            >واحد اصلی :
                            <i>{{ aStuff.sUnit }}</i>
                            <i
                                v-if="
                                    aStuff.bBox &&
                                        aStuff.dNumberSelect ===
                                            aStuff.dNumberInBox
                                "
                            >
                                {{
                                    ' / ' +
                                        'واحد فرعی : ' +
                                        aStuff.sBoxName +
                                        ' (' +
                                        aStuff.dNumberInBox +
                                        ')'
                                }}
                            </i>
                            <i
                                v-if="
                                    aStuff.bBox2 &&
                                        aStuff.dNumberSelect ===
                                            aStuff.dNumberInBox2 *
                                                aStuff.dNumberInBox
                                "
                            >
                                {{
                                    ' / ' +
                                        'واحد فرعی : ' +
                                        aStuff.sBoxName2 +
                                        ' (' +
                                        aStuff.dNumberInBox2 *
                                            aStuff.dNumberInBox +
                                        ')'
                                }}
                            </i>
                        </small>
                    </div>

                    <div class="stuff__footer d-flex flex-column">
                        <small class="text-muted">
                            <i
                                v-if="
                                    aStuff.bBox &&
                                        aStuff.dNumberSelect ===
                                            aStuff.dNumberInBox
                                "
                            >
                                {{
                                    aStuff.sBoxName +
                                        ' (' +
                                        aStuff.Count / aStuff.dNumberSelect +
                                        'x' +
                                        aStuff.dNumberInBox +
                                        ')'
                                }}
                            </i>
                            <i
                                v-if="
                                    aStuff.bBox2 &&
                                        aStuff.dNumberSelect ===
                                            aStuff.dNumberInBox2 *
                                                aStuff.dNumberInBox
                                "
                            >
                                {{
                                    aStuff.sBoxName2 +
                                        ' (' +
                                        aStuff.Count / aStuff.dNumberSelect +
                                        'x' +
                                        aStuff.dNumberInBox2 *
                                            aStuff.dNumberInBox +
                                        ')'
                                }}
                            </i>
                        </small>
                        <button
                            @click="
                                targetStuff(aStuff, false),
                                    editStuffModal.show()
                            "
                            class="btn"
                        >
                            ویرایش
                        </button>
                        <div
                            v-if="aStuff.dCount"
                            class="stuff-counter d-flex flex-row flex-wrap justify-content-between align-items-center border rounded"
                        >
                            <button
                                @click="
                                    targetStuff(aStuff), addStuffToFacture()
                                "
                                class="stuff-counter__add btn btn-sm shadow-sm"
                            >
                                <BIconPlus />
                            </button>
                            <div class="stuff-counter__count">
                                <strong>
                                    {{ aStuff.Count ? aStuff.Count : 0 }}
                                </strong>
                            </div>
                            <button
                                @click="
                                    targetStuff(aStuff),
                                        removeStuffFromFacture()
                                "
                                class="stuff-counter__remove btn btn-sm shadow-sm"
                            >
                                <BIconDash />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="factureData-footer">
                    <div class="fixed-bottom py-3">
                        <div class="container d-flex flex-column">
                            <div
                                id="factureTools"
                                class="d-flex flex-row justify-content-between align-items-center mb-4"
                            >
                                <button
                                    @click="viewPersonnels()"
                                    class="btn btn-light btn-lg text-secondary rounded-circle mx-2 shadow-lg"
                                >
                                    <BIconPeopleFill />
                                </button>
                                <button
                                    v-if="config.show"
                                    @click="
                                        ;(config.addStuffEvent = true) &&
                                            (config.show = false)
                                    "
                                    class="align-self-end btn btn-primary btn-lg rounded-pill shadow-lg"
                                >
                                    اضافه کردن کالا
                                    <BIconPlus />
                                </button>
                                <button
                                    @click="descModal.show()"
                                    class="btn btn-light btn-lg text-secondary rounded-circle mx-2 shadow-lg"
                                >
                                    <BIconCardText />
                                </button>
                            </div>
                            <div
                                v-if="factureData.stuffs.length"
                                id="factureSum"
                                data-bs-target="#offcanvasBottom"
                                class="d-flex justify-content-between align-items-center bg-dark p-2 rounded w-100"
                                @click="factureFooterCanvas.show()"
                            >
                                <div class="d-flex align-items-center">
                                    <button
                                        class="btn btn-outline-light"
                                        style="pointer-events: none;"
                                    >
                                        {{ factureData.stuffs.length }}
                                    </button>
                                    <p
                                        class="text-white m-0 mx-4"
                                        style="pointer-events: none;"
                                    >
                                        {{
                                            getFactureTotalCost
                                                ? 'جمع :  ' +
                                                  Number(
                                                      getFactureTotalCost
                                                  ).toLocaleString() +
                                                  ' ریال'
                                                : ''
                                        }}
                                    </p>
                                </div>
                                <button
                                    class="btn text-white"
                                    style="pointer-events: none;"
                                >
                                    <BIconChevronLeft />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="text-wrapper d-flex flex-column justify-content-center align-items-center mt-auto"
            >
                <p
                    v-if="factureData.stuffs.length <= 0 && config.show"
                    class="text-info"
                >
                    {{ config.startMessage }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService'
import Person from '@/components/Person'
import Stuff from '@/components/Stuff'
import { Modal, Offcanvas, Toast } from 'bootstrap'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    name: 'FactureStore',
    components: { Person, Stuff },
    data: () => ({
        stuffModal: null,
        editStuffModal: null,
        fullModal: null,
        descModal: null,
        personnelsEvent: false,
        cashesAndAccountsEvent: false,
        recipientsEvent: false,
        stuffDetailsEvent: false,
        setPersonnelsEvent: false,
        paidEvent: true,
        modalAlert: {
            isVisible: false,
            message: '',
        },
        filterOptionsCanvas: null,
        getStoresCanvas: null,
        factureFooterCanvas: null,
        stateModeToast: null,
        notice: null,
        storeInStuffList: {},
        marketers: [],
        players: [],
        personnelsID: {
            marketerID: 0,
            playerID: 0,
            receiptAgentID: 0,
        },
        receiptAgents: [],
        recipientsError: {
            status: false,
            message: '',
        },
        allCashes: [],
        cashes: [],
        accountsPose: [],
        accounts: [],
        cashID: 0,
        accountID: 0,
        accountID2: 0,
        accountID3: 0,
        cashesAndAccounts: {
            cashAmount: 0,
            accountAmount1: 0,
            accountAmount2: 0,
            accountAmount3: 0,
        },
        factureFinalize: {
            dDiscount: 0,
            dTaxPercent: 0,
            dImpositionPercent: 0,
            dTransportRent: 0,
        },
        factureOtherPerson: {
            required: false,
            sPerson: '',
            sPersonTel: '',
            sPersonAddress: '',
            sPersonNationalCode: '',
            sPersonPostCode: '',
            sPersonTel2: '',
        },
        personSearchKey: '',
        factureDesc: '',
        factureSumPaid: 0,
        factureNesieh: 0,

        storeSearchKey: '',
        stuffSearchKey: '',
        stuffsStock: false,

        stuff: {},
        editStuff: {},
        stuffList: true,
        stuffSingleClass: {},
        stuffFirstClassGroup: [],
        stuffSecondSingleClass: {},
        stuffSecondClassGroup: [],
        stuffThirdSingleClass: {},
        stuffThirdClassGroup: [],
        factureData: {
            iType: 0,
            iProjectID: 0,
            date: new Date(),
            iStoreID: null,
            iPersonID: null,
            sPerson: '',
            sPersonTel: '',
            sPersonAddress: '',
            sPersonNationalCode: '',
            sPersonPostCode: '',
            sPersonTel2: '',

            dSum: 0,
            dSumAll: 0,
            dSumPaid: 0,
            dSpot: 0,
            dNesieh: 0,
            dDiscount: 0,
            dDiscountPercent: 0,
            dTax: 0,
            dTaxPercent: 0,
            dImposition: 0,
            dImpositionPercent: 0,
            dTransportRent: 0,
            dTransportAmount: 0,

            iPersonnelID: 0,
            iPersonnelID2: 0,
            iPersonnelID3: 0,

            iCashID: 0,
            iAccountID: 0,
            iAccountID2: 0,
            iAccountID3: 0,
            dCashAmount: 0,
            dAccountAmount1: 0,
            dAccountAmount2: 0,
            dAccountAmount3: 0,
            sPayNumber1: '',
            sPayNumber2: '',
            sPayNumber3: '',

            dGPSx: 0,
            dGPSy: 0,
            sDesc: '',
            stuffs: [],
        },
        config: {
            show: true,
            addItemEvent: false,
            addStoreEvent: false,
            addStuffEvent: false,
            addFilterEvent: false,
            stuffFirstClassEvent: true,
            stuffSecondClassEvent: false,
            stuffThirdClassEvent: false,
            isSearch: true,
            isActive: false,
            errorState: false,
            startMessage: 'برای افزودن کالا دکمه اضافه کردن را بزنید',
        },
        alert: {
            state: false,
            status: 0,
            message: '',
        },
    }),
    watch: {
        // storeID() {
        //     this.fetchStuffs()
        // },
        // factureSumPaid(value, oldValue) {
        //     if (this.sumCashAndAccountsAmount < 0) {
        //         let i = 0
        //         i = this.factureNesieh - value
        //         this.factureNesieh = i
        //         i = 0
        //         i = this.factureNesieh + oldValue
        //         this.factureNesieh = i
        //     }
        //     // console.log('now : ' + value + ' last : ' + oldValue)
        // },
    },
    computed: {
        // states from vuex store
        ...mapState(['isLoading']),
        ...mapState('user', ['userSettings']),
        ...mapState('facture', [
            'persons',
            'person',
            'stores',
            'store',
            'stuffs',
        ]),
        ...mapGetters('facture', ['storeID', 'factureNumber']),
        cashName() {
            return this.getName(this.cashes, this.cashID)
        },
        poseName() {
            return this.getName(this.accountsPose, this.accountID)
        },
        accountName() {
            return this.getName(this.accounts, this.accountID2)
        },
        havaleName() {
            return this.getName(this.accounts, this.accountID3)
        },
        // tc
        getFactureTotalCount() {
            let totalCount = 0
            this.factureData.stuffs.forEach(stuff => {
                totalCount += stuff.Count
            })
            return totalCount
        },
        // return sum cash/pose/account
        sumCashAndAccountsAmount() {
            this.factureData.dSpot = 0
            let cashAmount = Number(this.cashesAndAccounts.cashAmount)
            let accountAmount1 = Number(this.cashesAndAccounts.accountAmount1)
            let accountAmount2 = Number(this.cashesAndAccounts.accountAmount2)
            let accountAmount3 = Number(this.cashesAndAccounts.accountAmount3)
            this.factureData.dSpot =
                cashAmount + accountAmount1 + accountAmount2 + accountAmount3
            return Math.round(this.factureData.dSpot)
        },
        remainingFacture() {
            return Number(
                this.factureData.dSumAll - this.sumCashAndAccountsAmount
            )
        },
        getGrossFactureTotalCost() {
            let grossSum = 0
            this.factureData.stuffs.forEach(stuff => {
                grossSum += stuff.Count * stuff.dPrice
            })
            return Math.round(grossSum)
        },
        // facture sum + discount/tax/imposition
        getFactureTotalCost() {
            this.factureData.dSum = 0
            this.factureData.stuffs.forEach(stuff => {
                this.factureData.dSum += stuff.dAmount
            })
            return Math.round(this.factureData.dSum)
        },
        // end sum facture
        getSumAll() {
            let dSumAll = this.factureData.dSum
            let dTaxPercent = 0
            let dImpositionPercent = 0
            let dTransportRent = 0
            dSumAll -= Number(this.factureFinalize.dDiscount)
            dTaxPercent = Number(
                (this.factureFinalize.dTaxPercent * dSumAll) / 100
            )
            dImpositionPercent = Number(
                (this.factureFinalize.dImpositionPercent * dSumAll) / 100
            )
            dTransportRent = Number(this.factureFinalize.dTransportRent)
            return Math.round(
                dSumAll + dTaxPercent + dImpositionPercent + dTransportRent
            )
        },
        // save facture in browser
        setfStuffs() {
            localStorage.setItem(
                'fStuffs',
                JSON.stringify(this.factureData.stuffs)
            )
        },
    },
    methods: {
        ...mapActions('facture', [
            'fetchFactureNumMax',
            'fetchPersons',
            'setPerson',
            'fetchStores',
            'setStore',
            'fetchStuffs',
        ]),
        initConfig() {
            this.config.show = true
            this.config.addItemEvent = false
            this.config.addStoreEvent = false
            this.config.addStuffEvent = false
            this.config.isSearch = true
        },
        // get all persons
        getPersons() {
            this.fetchPersons(this.personSearchKey)
        },
        // select person in facture
        selectPerson(person) {
            this.setPerson(person)
            this.initConfig()
        },
        // get all stores
        getStores() {
            this.fetchStores(this.storeSearchKey)
        },
        // select store in facture
        selectStore(store) {
            this.setStore(store)
            this.initConfig()
        },
        // get stuffs
        getStuffsStore() {
            this.fetchStuffs(this.stuffSearchKey, Number(this.stuffsStock))
        },

        selectStoreinStuffList(store) {
            this.storeInStuffList = {
                iID: store.iID,
                sName: store.sName,
            }
            this.getStuffsStoreInStuffList()
            this.getStoresCanvas.hide()
        },
        getStuffsStoreInStuffList() {
            // this.isLoading = true
            EventService.getStuffsStoreStore(this.storeInStuffList.iID)
                .then(({ data }) => {
                    this.stuffs = data
                    // this.isLoading = false
                })
                .catch(err => err)
        },
        viewStuffFirstClass() {
            this.config.stuffSecondClassEvent = false
            this.config.stuffThirdClassEvent = false
            this.config.stuffFirstClassEvent = true
        },
        viewStuffSecondClass() {
            this.config.stuffFirstClassEvent = false
            this.config.stuffThirdClassEvent = false
            this.config.stuffSecondClassEvent = true
        },
        viewStuffThirdClass() {
            this.config.stuffSecondClassEvent = false
            this.config.stuffFirstClassEvent = false
            this.config.stuffThirdClassEvent = true
        },
        stuffFirstClass() {
            EventService.getStuffFirstClass()
                .then(({ data }) => {
                    this.stuffFirstClassGroup = data
                    this.viewStuffFirstClass()
                    if (
                        this.stuffSingleClass.iID !== 0 &&
                        this.stuffSecondSingleClass.iID !== 0
                    ) {
                        this.stuffSingleClass.iID = null
                        this.stuffSecondSingleClass.iID = null
                        this.getStuffsStore()
                    }
                })
                .catch(err => (err.status === 0 ? err.message : err))
        },
        stuffSecondClass(id, name) {
            EventService.getStuffSecondClass(id)
                .then(({ data }) => {
                    this.stuffSingleClass = { iID: id, sName: name }
                    this.stuffSecondClassGroup = data
                    this.viewStuffSecondClass()
                    this.getStuffsStore(this.stuffSingleClass.iID)
                })
                .catch(err => (err.status === 0 ? err.message : err))
        },
        stuffThirdClass(id, name) {
            EventService.getStuffThirdClass(this.stuffSingleClass.iID, id)
                .then(({ data }) => {
                    this.stuffSecondSingleClass = { iID: id, sName: name }
                    this.stuffThirdClassGroup = data
                    this.viewStuffThirdClass()
                    this.getStuffsStore()
                })
                .catch(err => (err.status === 0 ? err.message : err))
        },

        targetStuff(stuff, stuffList) {
            function setDefaultSellBox(stuff) {
                switch (stuff.iDefaultSellBox) {
                    case 0:
                        stuff.dNumberSelect = 1
                        break
                    case 1:
                        stuff.dNumberSelect = stuff.dNumberInBox
                        break
                    case 2:
                        stuff.dNumberSelect =
                            stuff.dNumberInBox2 * stuff.dNumberInBox
                }
            }
            if (stuffList) {
                // trigger stuff in stufflist
                this.stuff = stuff
                this.stuff = {
                    iStuffID: stuff.iID,
                    Name: stuff.Name,
                    Code: stuff.Code,
                    sBarCode: stuff.sBarCode,
                    dPrice: stuff.dSellPrice,
                    dBaseSellPrice: stuff.dBaseSellPrice,
                    dCount: stuff.dCount,
                    sUnit: stuff.sUnit,
                    sBoxName: stuff.sBoxName,
                    sBoxName2: stuff.sBoxName2,
                    bBox: stuff.bBox,
                    bBox2: stuff.bBox2,
                    dNumberInBox: stuff.dNumberInBox,
                    dNumberInBox2: stuff.dNumberInBox2,
                    bCanSellNoBox: stuff.bCanSellNoBox,
                    bCanSellBox: stuff.bCanSellBox,
                    bCanSellBox2: stuff.bCanSellBox2,
                    iDefaultSellBox: stuff.iDefaultSellBox,
                    sPicture: stuff.sPicture,
                }
                setDefaultSellBox(this.stuff)
                this.stuff.Count = 1
                this.stuff.iStoreID = this.store.iID
                this.stuff.iServiceID = 0
                this.stuff.dAmount = 0
                this.stuff.dDiscount = 0
                this.stuff.dTax = 0
                this.stuff.dImposition = 0
                this.stuff.sDesc = ''
                this.stuffList = true
            } else {
                // trigger stuff in facture
                this.stuffList = false
                this.stuff = stuff
                // edit stuff modal in facture
                this.editStuff = {
                    iStuffID: this.stuff.iStuffID,
                    sUnit: this.stuff.sUnit,
                    sBoxName: this.stuff.sBoxName,
                    sBoxName2: this.stuff.sBoxName2,
                    bBox: this.stuff.bBox,
                    bBox2: this.stuff.bBox2,
                    dNumberInBox: this.stuff.dNumberInBox,
                    dNumberInBox2: this.stuff.dNumberInBox2,
                    bCanSellNoBox: this.stuff.bCanSellNoBox,
                    bCanSellBox: this.stuff.bCanSellBox,
                    bCanSellBox2: this.stuff.bCanSellBox2,
                    dNumberSelect: this.stuff.dNumberSelect,
                    Count: this.stuff.Count / this.stuff.dNumberSelect,
                    iServiceID: this.stuff.iServiceID,
                    dPrice: this.stuff.dPrice,
                    dAmount: this.stuff.dAmount,
                    dDiscount: this.stuff.dDiscount,
                    dTax: this.stuff.dTax,
                    dImposition: this.stuff.dImposition,
                    sDesc: this.stuff.sDesc,
                }
                setDefaultSellBox(this.editStuff)
            }
        },
        iBoxSetter(stuff) {
            if (stuff.dNumberSelect === stuff.dNumberInBox) {
                stuff.iBox = 1
            } else if (
                stuff.dNumberSelect ===
                    stuff.dNumberInBox * stuff.dNumberInBox2 &&
                stuff.dNumberInBox2 !== 1
            ) {
                stuff.iBox = 2
            } else {
                stuff.iBox = 0
            }
        },
        // calculate stuff unit number
        unitRatio(stuff) {
            if (
                stuff.dNumberSelect === stuff.dNumberInBox2 &&
                stuff.dNumberInBox2 !== 1
            ) {
                return stuff.dNumberSelect * stuff.dNumberInBox
            } else {
                return stuff.dNumberSelect
            }
        },
        // calculate final count stuff
        finalCount(stuff, ratio) {
            return ratio * stuff.Count
        },
        // calculate dAmount stuff
        stuffAmount(stuff, finalCount) {
            // sum -= stuff.dDiscount2 * sum / 100
            let sum = 0
            let sumTax = 0
            let sumImposition = 0
            sum = finalCount * stuff.dPrice
            sum -= (stuff.dDiscount * sum) / 100
            sumTax = (stuff.dTax * sum) / 100
            sumImposition = (stuff.dImposition * sum) / 100
            return Math.round(sum + sumTax + sumImposition)
        },
        viewStuffDetails() {
            this.personnelsEvent = false
            this.cashesAndAccountsEvent = false
            this.recipientsEvent = false
            this.stuffDetailsEvent = true
            this.fullModal.show()
        },
        viewPersonnels() {
            this.cashesAndAccountsEvent = false
            this.stuffDetailsEvent = false
            this.recipientsEvent = false
            this.personnelsEvent = true

            const notEmpthy = !!(
                this.factureData.iPersonnelID !== 0 ||
                this.factureData.iPersonnelID2 !== 0 ||
                this.factureData.iPersonnelID3 !== 0
            )

            this.$MANTEGH.personnelsDefault = true

            if (this.$MANTEGH.personnelsDefault) {
                if (notEmpthy && this.setPersonnelsEvent) {
                    // set personnels static
                    this.personnelsID.marketerID = this.factureData.iPersonnelID
                    this.personnelsID.playerID = this.factureData.iPersonnelID2
                    this.personnelsID.receiptAgentID = this.factureData.iPersonnelID3
                } else {
                    console.log(!!Object.keys(this.person).length)
                    if (!!Object.keys(this.person).length) {
                        // set personnels with mantegh defaults
                        this.personnelsID.marketerID = this.person.iPersonnelID
                        this.factureData.iPersonnelID = this.person.iPersonnelID

                        this.personnelsID.playerID = this.person.iPersonnelID2
                        this.factureData.iPersonnelID2 = this.person.iPersonnelID2

                        this.personnelsID.receiptAgentID = this.person.iPersonnelID3
                        this.factureData.iPersonnelID3 = this.person.iPersonnelID3
                    } else {
                        this.personnelsID.marketerID = 0
                        this.factureData.iPersonnelID = 0

                        this.personnelsID.playerID = 0
                        this.factureData.iPersonnelID2 = 0

                        this.personnelsID.receiptAgentID = 0
                        this.factureData.iPersonnelID3 = 0
                    }
                }
            } else {
                if (notEmpthy) {
                    // set personnels static
                    this.personnelsID.marketerID = this.factureData.iPersonnelID
                    this.personnelsID.playerID = this.factureData.iPersonnelID2
                    this.personnelsID.receiptAgentID = this.factureData.iPersonnelID3
                } else {
                    this.personnelsID.marketerID = 0
                    this.personnelsID.playerID = 0
                    this.personnelsID.receiptAgentID = 0
                }
            }
            this.fullModal.show()
        },
        viewCashAndAccounts() {
            this.personnelsEvent = false
            this.stuffDetailsEvent = false
            this.recipientsEvent = false
            this.cashesAndAccountsEvent = true
        },
        viewRecipients() {
            this.cashesAndAccountsEvent = false
            this.stuffDetailsEvent = false
            this.personnelsEvent = false
            this.recipientsEvent = true

            const notEmpthy = !!(
                this.factureData.iCashID !== 0 ||
                this.factureData.iAccountID !== 0 ||
                this.factureData.iAccountID2 !== 0 ||
                this.factureData.iAccountID3 !== 0
            )

            if (notEmpthy) {
                this.cashID = this.factureData.iCashID
                this.accountID = this.factureData.iAccountID
                this.accountID2 = this.factureData.iAccountID2
                this.accountID3 = this.factureData.iAccountID3
            }
        },
        getName(array, id) {
            let name = ''
            array.some(item => {
                if (item.iID === id) {
                    name = item.sName
                }
            })
            return name
        },
        // calculate and return similar stuff total counts
        totalSimilarStuffCounts(stuffID) {
            let similarStuffs = []
            this.factureData.stuffs.forEach(item => {
                if (item.iStuffID === stuffID) {
                    similarStuffs.push(item)
                }
            })
            let totalCounts = 0
            similarStuffs.forEach(item => {
                totalCounts += item.Count
            })
            return totalCounts
        },
        // check similar stuff and give me spot
        isThere(stuffs, target) {
            let whichStuff = 0
            let stuffStatus = false
            stuffs.some((item, key) => {
                if (
                    item.iStuffID === target.iStuffID &&
                    item.dNumberSelect === target.dNumberSelect
                ) {
                    whichStuff = key
                    stuffStatus = true
                }
            })

            return { spot: whichStuff, status: stuffStatus }
        },
        /**
         * @type { event/method }
         * add stuff in facture
         * scope: stuff list && facture
         */
        addStuffToFacture() {
            /**
             * @type { boolean }
             * check stuff competence
             * have dCount / finalCount bigger than dCount / finalCount not negative
             */
            let factureStuffs = this.factureData.stuffs
            let stuff = this.stuff

            let ratio = this.unitRatio(stuff)
            let finalStuffCount = this.finalCount(stuff, ratio)
            let stuffAmount = this.stuffAmount(stuff, finalStuffCount)

            let stuffCompetence =
                stuff.dCount &&
                finalStuffCount > 0 &&
                stuff.dCount >= finalStuffCount

            /**
             * @type { condition }
             * when facture is empthy(first push stuff)
             */
            if (factureStuffs.length <= 0) {
                if (stuffCompetence) {
                    this.stuffModal.hide()
                    this.iBoxSetter(stuff)
                    stuff.Count = finalStuffCount
                    stuff.dAmount = stuffAmount
                    factureStuffs.push(stuff)
                    this.notice.show()
                    stuff = {}
                } else {
                    this.modalAlert.isVisible = true
                    this.modalAlert.message =
                        'تعداد کالای انتخاب شده بیش از موجودی است'
                    this.stateModeToast.show()
                }
            } else {
                let existing = this.isThere(factureStuffs, stuff)

                let totalSimilarStuffCounts = this.totalSimilarStuffCounts(
                    stuff.iStuffID
                )
                // console.log(
                //     totalSimilarStuffCounts + ' and is : ' + finalStuffCount
                // )

                /**
                 * @type { condition }
                 * when in facture existing similar stuff / facture not empthy
                 */
                console.log(existing)
                if (existing.status) {
                    if (this.stuffList) {
                        /**
                         * @type { condition }
                         * stuff list / add stuff in facture
                         */
                        if (
                            totalSimilarStuffCounts + finalStuffCount <=
                            stuff.dCount
                        ) {
                            factureStuffs[existing.spot].dAmount += stuffAmount
                            factureStuffs[
                                existing.spot
                            ].Count += finalStuffCount
                            this.stuffModal.hide()
                            this.modalAlert.isVisible = false
                            stuff = {}
                        } else {
                            this.modalAlert.isVisible = true
                            this.modalAlert.message =
                                'تعداد کالای انتخاب شده بیش از موجودی است'
                            this.stateModeToast.show()
                        }
                    } else {
                        let totalSimilarStuffFactureCounts = this.totalSimilarStuffCounts(
                            factureStuffs[existing.spot].iStuffID
                        )

                        let ratioFacture = this.unitRatio(
                            factureStuffs[existing.spot]
                        )

                        if (
                            totalSimilarStuffFactureCounts + ratioFacture <=
                            factureStuffs[existing.spot].dCount
                        ) {
                            /**
                             * @type { condition }
                             * facture / add stuff in facture
                             * increment stuff & calculate dAmount
                             */

                            factureStuffs[existing.spot].Count += ratioFacture

                            let stuffAmountFacture = this.stuffAmount(
                                factureStuffs[existing.spot],
                                factureStuffs[existing.spot].Count
                            )

                            factureStuffs[
                                existing.spot
                            ].dAmount = stuffAmountFacture
                        } else {
                            setTimeout(() => {
                                this.alert.state = 0
                                this.alert.message = null
                            }, 5000)
                            this.alert.state = 1
                            this.alert.message =
                                'موجودی کالای انتخاب شده صفر است'
                        }
                    }
                } else {
                    if (
                        stuffCompetence &&
                        stuff.dCount >=
                            totalSimilarStuffCounts + finalStuffCount
                    ) {
                        this.iBoxSetter(stuff)
                        stuff.Count = finalStuffCount
                        stuff.dAmount = stuffAmount
                        factureStuffs.push(stuff)
                        this.stuffModal.hide()
                        this.modalAlert.isVisible = false
                        stuff = {}
                    } else {
                        this.modalAlert.isVisible = true
                        this.modalAlert.message =
                            'تعداد کالای انتخاب شده بیش از موجودی است'
                        this.stateModeToast.show()
                    }
                }
            }

            // save facture to localStorage
            this.setfStuffs
            console.log(this.factureData)
        },

        removeStuffFromFacture() {
            let factureStuffs = this.factureData.stuffs
            let stuff = this.stuff

            let existing = this.isThere(factureStuffs, stuff)

            let ratioFacture = this.unitRatio(factureStuffs[existing.spot])

            if (existing.status) {
                if (factureStuffs[existing.spot].Count > 0) {
                    factureStuffs[existing.spot].Count -= ratioFacture

                    let stuffAmountFacture = this.stuffAmount(
                        factureStuffs[existing.spot],
                        factureStuffs[existing.spot].Count
                    )

                    factureStuffs[existing.spot].dAmount = stuffAmountFacture

                    if (factureStuffs[existing.spot].Count < 1) {
                        factureStuffs[existing.spot].dAmount = 0
                        factureStuffs.splice(existing.spot, 1)
                    }
                }
            } else {
                factureStuffs.splice(factureStuffs[existing.spot])
            }

            // save facture to localStorage
            this.setfStuffs
        },

        editStuffinFacture() {
            let factureStuffs = this.factureData.stuffs
            let stuff = this.stuff
            let editStuff = this.editStuff

            let ratio = this.unitRatio(editStuff)
            let finalStuffCount = this.finalCount(editStuff, ratio)
            let stuffAmount = this.stuffAmount(editStuff, finalStuffCount)

            let existing = this.isThere(factureStuffs, stuff)

            let existingEditedStuff = this.isThere(factureStuffs, editStuff)

            let totalSimilarStuffFactureCounts = this.totalSimilarStuffCounts(
                factureStuffs[existing.spot].iStuffID
            )

            if (
                totalSimilarStuffFactureCounts +
                    (finalStuffCount - factureStuffs[existing.spot].Count) <=
                factureStuffs[existing.spot].dCount
            ) {
                if (
                    existingEditedStuff.status &&
                    existingEditedStuff.spot !== existing.spot
                ) {
                    let editIBox = this.iBoxSetter(editStuff)
                    factureStuffs[existingEditedStuff.spot].iBox = editIBox

                    factureStuffs[existingEditedStuff.spot].Count += Number(
                        finalStuffCount
                    )

                    factureStuffs[existingEditedStuff.spot].dPrice = Number(
                        editStuff.dPrice
                    )

                    factureStuffs[existingEditedStuff.spot].dDiscount = Number(
                        editStuff.dDiscount
                    )

                    factureStuffs[existingEditedStuff.spot].dTax = Number(
                        editStuff.dTax
                    )

                    factureStuffs[
                        existingEditedStuff.spot
                    ].dImposition = Number(editStuff.dImposition)

                    factureStuffs[existingEditedStuff.spot].sDesc =
                        editStuff.sDesc

                    factureStuffs[
                        existingEditedStuff.spot
                    ].dAmount = this.stuffAmount(
                        editStuff,
                        factureStuffs[existingEditedStuff.spot].Count
                    )

                    factureStuffs.splice(existing.spot, 1)

                    this.editStuffModal.hide()
                } else {
                    factureStuffs[existing.spot].dNumberSelect = Number(
                        editStuff.dNumberSelect
                    )
                    let editIBox = this.iBoxSetter(editStuff)
                    factureStuffs[existing.spot].iBox = editIBox
                    factureStuffs[existing.spot].Count = Number(finalStuffCount)
                    factureStuffs[existing.spot].dPrice = Number(
                        editStuff.dPrice
                    )
                    factureStuffs[existing.spot].dDiscount = Number(
                        editStuff.dDiscount
                    )
                    factureStuffs[existing.spot].dTax = Number(editStuff.dTax)
                    factureStuffs[existing.spot].dImposition = Number(
                        editStuff.dImposition
                    )
                    factureStuffs[existing.spot].sDesc = editStuff.sDesc
                    factureStuffs[existing.spot].dAmount = stuffAmount

                    this.editStuffModal.hide()
                }
            } else {
                this.modalAlert.isVisible = true
                this.modalAlert.message =
                    'تعداد کالای انتخاب شده بیش از موجودی است'
                this.stateModeToast.show()
            }

            // save facture to localStorage
            this.setfStuffs

            console.log(this.factureData.stuffs)
        },

        /**
         * @type { event/method }
         * clear stuffs from facture & local
         */
        clearFacture() {
            if (
                localStorage.person ||
                localStorage.store ||
                localStorage.fStuffs
            ) {
                localStorage.removeItem('person')
                this.person = {}
                localStorage.removeItem('store')
                this.factureData.stuffs = []
                localStorage.removeItem('fStuffs')
                this.$forceUpdate()
            } else {
                if (localStorage.person) {
                    localStorage.removeItem('person')
                    this.person = {}
                } else if (localStorage.store) {
                    localStorage.removeItem('store')
                } else if (localStorage.fStuffs) {
                    this.factureData.stuffs = []
                    localStorage.removeItem('fStuffs')
                }
                this.$forceUpdate()
            }
        },

        finalizeFacture() {
            this.factureData.dSumAll = Number(this.getSumAll)
            this.factureNesieh = Math.round(Number(this.getSumAll))
            this.factureData.dDiscount = Number(this.factureFinalize.dDiscount)
            this.factureData.dTaxPercent = Number(
                this.factureFinalize.dTaxPercent
            )
            this.factureData.dImpositionPercent = Number(
                this.factureFinalize.dImpositionPercent
            )
            this.factureData.dTransportRent = Number(
                this.factureFinalize.dTransportRent
            )
            this.factureFooterCanvas.hide()
            this.fullModal.show()
            this.viewCashAndAccounts()
        },
        // end registeration facture
        registerFacture() {
            if (!Object.keys(this.person).length) {
                this.recipientsError.status = true
                this.recipientsError.message = 'لطفا طرف حساب را انتخاب کنید'
                setTimeout(() => (this.recipientsError.status = false), 2000)
            } else if (
                !this.factureNesieh > this.factureSumPaid &&
                !this.factureNesieh < 0
            ) {
                this.recipientsError.status = true
                this.recipientsError.message =
                    'جمع اقلام با جمع نسیه + نقد برابر نیست!'
                setTimeout(() => (this.recipientsError.status = false), 2000)
            } else {
                this.factureData.dSumPaid = this.factureSumPaid
                this.factureData.dNesieh = this.factureNesieh
                // MANTEGH config check
                this.$MANTEGH.otherPersonRequired = false
                if (this.$MANTEGH.otherPersonRequired) {
                    this.factureOtherPerson.required = true
                    if (
                        this.factureOtherPerson.required &&
                        this.factureOtherPerson.sPersonName.length != 0 &&
                        this.factureOtherPerson.sPersonTel.length != 0
                    ) {
                        this.factureData.sPersonName = this.factureOtherPerson.sPersonName
                        this.factureData.sPersonTel = this.factureOtherPerson.sPersonTel
                        this.factureData.sPersonAddress = this.factureOtherPerson.sPersonAddress
                        this.factureData.sPersonNationalCode = this.factureOtherPerson.sPersonNationalCode
                        this.factureData.sPersonPostCode = this.factureOtherPerson.sPersonPostCode
                        this.factureData.sPersonTel2 = this.factureOtherPerson.sPersonTel2
                    } else {
                        this.recipientsError.status = true
                        this.recipientsError.message =
                            'فیلد نام و موبایل طرف حساب متفرقه اجباری است'
                        setTimeout(
                            () => (this.recipientsError.status = false),
                            2000
                        )
                        return false
                    }
                } else {
                    this.factureData.sPersonName = this.factureOtherPerson.sPersonName
                    this.factureData.sPersonTel = this.factureOtherPerson.sPersonTel
                    this.factureData.sPersonAddress = this.factureOtherPerson.sPersonAddress
                    this.factureData.sPersonNationalCode = this.factureOtherPerson.sPersonNationalCode
                    this.factureData.sPersonPostCode = this.factureOtherPerson.sPersonPostCode
                    this.factureData.sPersonTel2 = this.factureOtherPerson.sPersonTel2
                }
                console.log(this.factureData)
                EventService.factureStore(this.factureData)
                    .then(({ data }) => {
                        this.recipientsError.status = true
                        this.recipientsError.message = `فاکتور با شماره ${data.iNum} با موفقیت ثبت شد`
                        setTimeout(
                            () => (this.recipientsError.status = false),
                            2000
                        )
                        this.fullModal.hide()
                        this.clearFacture()
                        // location.reload()
                    })
                    .catch(err => err.response)
            }
        },

        // fetch personnels data and show in selectors
        async getPersonnels() {
            const marketers = await EventService.getPersonnels(1).then(
                ({ data }) => data
            )
            const players = await EventService.getPersonnels(2).then(
                ({ data }) => data
            )
            const receiptAgents = await EventService.getPersonnels(3).then(
                ({ data }) => data
            )

            Promise.all([marketers, players, receiptAgents])
                .then(data => {
                    this.marketers = data[0]
                    this.players = data[1]
                    this.receiptAgents = data[2]
                })
                .catch(err => err)
        },

        // save personnel changes in facture
        setPersonnels() {
            this.factureData.iPersonnelID = this.personnelsID.marketerID
            this.factureData.iPersonnelID2 = this.personnelsID.playerID
            this.factureData.iPersonnelID3 = this.personnelsID.receiptAgentID
            this.setPersonnelsEvent = true
            this.fullModal.hide()
        },
        // set facture Description
        setDescription() {
            this.factureData.sDesc = this.factureDesc
            this.descModal.hide()
        },
        getCashes() {
            // fetch all cashes/pose accounts/accounts
            EventService.getCashAndAccounts()
                .then(({ data }) => {
                    this.allCashes = data
                })
                .catch(err => new Error(err))

            // fetch just cashes
            EventService.getCashes()
                .then(({ data }) => {
                    this.cashes = data
                    if (this.$MANTEGH.defaultCash) {
                        this.cashID = this.$MANTEGH.defaultCashID
                    } else {
                        this.cashID = 0
                        this.factureData.iCashID = this.cashID
                    }
                })
                .catch(err => new Error(err))
        },
        getAccounts() {
            // fetch pose accounts
            EventService.getAccounts(1).then(({ data }) => {
                this.accountsPose = data
                if (this.$MANTEGH.defaultPose) {
                    this.accountID = this.$MANTEGH.defaultPoseID
                } else {
                    this.accountID = 0
                }
            })
            // fetch accounts
            EventService.getAccounts().then(({ data }) => {
                this.accounts = data
                if (this.$MANTEGH.defaultPose) {
                    this.accountID2 = this.$MANTEGH.defaultAccountID2
                    this.accountID3 = this.$MANTEGH.defaultAccountID3
                } else {
                    this.accountID2 = 0
                    this.accountID3 = 0
                }
            })
        },
        setRecipients() {
            let recipients = [
                {
                    name: 'صندوق',
                    id: this.cashID,
                    amount: this.cashesAndAccounts.cashAmount,
                },
                {
                    name: 'کارت خوان',
                    id: this.accountID,
                    amount: this.cashesAndAccounts.accountAmount1,
                },
                {
                    name: 'حساب',
                    id: this.accountID2,
                    amount: this.cashesAndAccounts.accountAmount2,
                },
                {
                    name: 'حواله',
                    id: this.accountID3,
                    amount: this.cashesAndAccounts.accountAmount3,
                },
            ]

            let recipientsStatus = false

            recipients.some(recipient => {
                if (recipient.id === 0 && recipient.amount !== 0) {
                    this.recipientsError.status = true
                    this.recipientsError.message = `لطفا ${recipient.name} را انتخاب کنید`
                    setTimeout(
                        () => (this.recipientsError.status = false),
                        2000
                    )
                } else if (
                    recipient.id !== 0 &&
                    (recipient.amount === 0 || recipient.amount.length === 0)
                ) {
                    this.recipientsError.status = true
                    this.recipientsError.message = `لطفا مبلغ ${recipient.name} را وارد کنید`
                    setTimeout(
                        () => (this.recipientsError.status = false),
                        2000
                    )
                }
            })

            if (this.remainingFacture < 0) {
                this.recipientsError.status = true
                this.recipientsError.message = 'مبلغ پرداختی نمیتواند منفی باشد'
                setTimeout(() => (this.recipientsError.status = false), 2000)
            }

            if (!this.recipientsError.status) recipientsStatus = true

            if (this.sumCashAndAccountsAmount > 0 && recipientsStatus) {
                this.factureData.iCashID = this.cashID
                this.factureData.iAccountID = this.accountID
                this.factureData.iAccountID2 = this.accountID2
                this.factureData.iAccountID3 = this.accountID3
                this.factureData.dCashAmount = this.cashesAndAccounts.cashAmount
                this.factureData.dAccountAmount1 = this.cashesAndAccounts.accountAmount1
                this.factureData.dAccountAmount2 = this.cashesAndAccounts.accountAmount2
                this.factureData.dAccountAmount3 = this.cashesAndAccounts.accountAmount3
                this.factureNesieh = this.remainingFacture
                this.factureSumPaid = this.sumCashAndAccountsAmount
                this.paidEvent = false
                this.viewCashAndAccounts()
            } else if (
                this.sumCashAndAccountsAmount === 0 &&
                !this.recipientsError.status
            ) {
                this.factureData.iCashID = this.cashID
                this.factureData.iAccountID = this.accountID
                this.factureData.iAccountID2 = this.accountID2
                this.factureData.iAccountID3 = this.accountID3

                if (!String(this.cashesAndAccounts.cashAmount).length)
                    this.factureData.dCashAmount = 0
                else
                    this.factureData.dCashAmount = this.cashesAndAccounts.cashAmount
                if (!String(this.cashesAndAccounts.accountAmount1).length)
                    this.factureData.dAccountAmount1 = 0
                else
                    this.factureData.dAccountAmount1 = this.cashesAndAccounts.accountAmount1
                if (!String(this.cashesAndAccounts.accountAmount2).length)
                    this.factureData.dAccountAmount2 = 0
                else
                    this.factureData.dAccountAmount2 = this.cashesAndAccounts.accountAmount2
                if (!String(this.cashesAndAccounts.accountAmount3).length)
                    this.factureData.dAccountAmount3 = 0
                else
                    this.factureData.dAccountAmount3 = this.cashesAndAccounts.accountAmount3
                this.factureNesieh = this.factureData.dSumAll
                this.factureSumPaid = this.sumCashAndAccountsAmount
                this.paidEvent = true
                this.viewCashAndAccounts()
            }
        },

        // random string generator
        randomString() {
            var characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
            var lenString = 8
            var randomstring = ''

            for (var i = 0; i < lenString; i++) {
                var rnum = Math.floor(Math.random() * characters.length)
                randomstring += characters.substring(rnum, rnum + 1)
            }

            return randomstring
        },
    },

    created() {
        if (localStorage.fStuffs)
            this.factureData.stuffs = JSON.parse(localStorage.fStuffs)
        this.fetchFactureNumMax()
        this.getStores()
        this.stuffFirstClass()
        this.getPersons()
        this.getPersonnels()
        this.getCashes()
        this.getAccounts()
    },

    mounted() {
        let modalConfig = { backdrop: 'static', keyboard: false }
        this.stuffModal = new Modal(this.$refs.stuffModal)
        this.editStuffModal = new Modal(this.$refs.editStuffModal, modalConfig)
        this.fullModal = new Modal(this.$refs.fullModal)
        this.descModal = new Modal(this.$refs.descModal)
        this.filterOptionsCanvas = new Offcanvas(this.$refs.filterOptionsCanvas)
        this.factureFooterCanvas = new Offcanvas(this.$refs.factureFooterCanvas)
        this.getStoresCanvas = new Offcanvas(this.$refs.getStoresCanvas)
        this.stateModeToast = new Toast(this.$refs.stateModeToast, {
            delay: 2000,
        })

        this.notice = new Toast(this.$refs.notice)
        // console.log(this.notice)
    },
}
</script>

<style lang="sass">
.stuff-img-wrap
    width: 80px
    height: 80px
    margin-left: 16px
.stuff
    &__img
        max-width: 100%
        max-height: auto
.divider
    border-top: 1px dashed rgba(128, 128, 128, 0.1)
</style>

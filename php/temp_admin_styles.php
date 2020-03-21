<!-- ******************************************************************* -->
<!--                            STYLES                                 -->
<!-- ******************************************************************* -->
<section id="styles">
    <h2 class="title">STYLES</h2>
    <?php
    $result = $db->query("select * from dance_style;");
    if ($result->rowCount()) {
        while ($data = $result->fetch()) {
    ?>
            <div>
                <a class="btn">
                    <input value="<?php echo $data['name'] ?>">
                    <i class="icon-down-open" onclick="show_style(this)"></i>
                </a>
                <textarea class="list" name="" id="" cols="30" rows="10"><?php echo $data['description'] ?></textarea>
            </div>
    <?php
        }
    }
    ?>
</section>